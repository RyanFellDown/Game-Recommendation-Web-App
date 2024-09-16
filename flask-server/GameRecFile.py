import pandas as pd
import operator
import numpy as np
import json

#Establish universal variables here...
reviewScoresList = []
reviewsTotalList = []

game_ratings = pd.read_csv('./SteamTrends2023.csv')


#We then send the values into necessary lists for later use.
def toLists():
    #We first initialize the dataframe, taking in the Steam Trends 2023 CSV.
    game_ratings = pd.read_csv('./SteamTrends2023.csv')

    #Cleaning Data First
    game_ratings = game_ratings.drop(['App ID', 'Reviews D7', 'Reviews D30', 'Reviews D90', 'name_slug'], axis=1)
    game_ratings['ReviewScores'] = game_ratings['ReviewScores'].map(lambda x: x.rstrip('%'))

    #We're going to use these two values for the recommendation score, so we add them to lists we can access.
    reviewScoresList = game_ratings['ReviewScores'].tolist()
    reviewsTotalList = game_ratings['Reviews Total'].tolist()
 
    reviewScoresList = [i.replace(',', '.') for i in reviewScoresList]
    for y in range(0, len(reviewScoresList)):
        reviewScoresList[y] = float(reviewScoresList[y])
        
    weightedAverages(reviewScoresList, reviewsTotalList)
    
    
    
"""
    Now, able to use the lists, we get the weighted averages of each game.
    This is done by multiplying the review score by the total number of reviews,
    as we don't want to recommend really obscure games (aka only going off of score)
    OR recommending more popular but low scoring games (aka only going off of popularity).
"""
def weightedAverages(reviewScoresList, reviewsTotalList):
    #Multiply the review scores and total reviews together, and add this to a new list which we'll add to it's own column.
    newList = []
    for x in range(0, len(reviewScoresList)):
        newList.append(operator.mul(reviewScoresList[x], reviewsTotalList[x]))
        
    game_ratings['WeightedColumn'] = newList

    #Cleaning a Little More...
    game_ratings.head()

    #Finally, Sort by Weighted Values
    game_ratings.sort_values("WeightedColumn", axis=0, ascending=False, inplace=True, na_position='first')


#Returns Genres of Game: Else, Gives Alternative Titles
def getGenres(gameName):
    #This will be called from the Flask end first, so we need to call the other functions first.
    toLists()
    
    if(game_ratings == gameName).any().any():
        #Find the game, its genres, and then add those genres to a string we can access in our genreSimilarity function.
        filtered_Games = game_ratings.loc[game_ratings['Title'] == gameName]
        filtered_Genres = filtered_Games['Tags'].tolist()
        string_Genres = filtered_Genres[0]
        list_Final = string_Genres.split(', ')
        game_ratings["RelevanceScore"] = np.nan
        
        #genreSimilarity will return the five most similar games to our game (#1 will always be the game itself, so we ignore it).
        five = genreSimilarity(list_Final)
        
        return toJSON(five)
        
    #else:
        #print("No game found, perhaps you're looking for one of these instead?")
        #suggested_Games = game_ratings.loc[game_ratings['Title'].str.contains(gameName)]
        #suggested_Titles = suggested_Games['Title']
        #print(suggested_Titles)


#Takes in genres from requested games, and keeps games with the same genres as that game
def genreSimilarity(list_Final):
    counter = 0
    game_ratings.head(n=1)

    #We calculate the relavence scores here, where we take the weighted column (# scores * % score) and multiply it by the number of genres
    #the game shares with our original input (and set that as the exponent to 5, otherwise we just return really popular games, not similar games).
    for index, row in game_ratings.iterrows():
        for x in list_Final:
            if x in row['Tags']:
                counter = counter + 1
        relevance = row['WeightedColumn'] * (3.5**counter)
        game_ratings.at[index, 'RelevanceScore'] = relevance
        counter = 0
        
    #Now, sort the dataframe by the relevance score, make topFive the top five related games, drop some useless columns, and return it.
    copyGameRatings = game_ratings.copy()
    copyGameRatings.sort_values("RelevanceScore", axis=0, ascending=False, inplace=True, na_position='first')
    topFive = copyGameRatings.head(n=5)
    topFive = topFive.drop(['Tags'], axis=1)
    game_ratings.sort_values("Reviews Total", axis=0, ascending=False, inplace=True, na_position='first')
    return topFive


#Get each row returned in the top five most similar games.
def toJSON(topFive):
    Games = []
    for row in topFive.index:
        Games.append(topFive.loc[row, :].values.flatten().tolist())
        
    #Convert to JSON so we can output on frontend.
    #json_Return1 = json.dumps(Games[0])
    json_Return2 = json.dumps(Games[1])
    json_Return3 = json.dumps(Games[2])
    json_Return4 = json.dumps(Games[3])
    #json_Return5 = json.dumps(Games[4])
    
    return ({
        "games": [
            #json_Return1,
            json_Return2,
            json_Return3,
            json_Return4,
            #json_Return5
        ]
    })