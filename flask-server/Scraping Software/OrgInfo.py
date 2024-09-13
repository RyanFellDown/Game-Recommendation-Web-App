from HTMLElement import attemptScrapeElement
from Driver import setDriver
from string import Template
import pandas as pd


#Establish website path and path to chromedriver
web = Template("https://steamdb.info/stats/gameratings/?all")
path = "C:/Users/rfell/WebScraping/chromedriver.exe"

peopleTotal, projectsTotal, packagesTotal, verified, followersTotal, location, website, twitter, emails, languageList, topicsList, finalTotal = ([] for i in range(12))


#This function scrapes the information of each requested organization.
def scrapeSteamDBInfo():
        
    driver = setDriver(path, web)

    #Scrape the correct information of the HTML of Github. This includes: People, projects, verification, 
    #followers, location, website URL, twitter, email, topics, and languages.
    peopleTotal.append(attemptScrapeElement(driver, '//span[@class="Counter js-profile-member-count"]', 'Total people'))
    projectsTotal.append(attemptScrapeElement(driver, '//span[@class="Counter js-profile-project-count"]', 'Total projects'))
    isVerified = attemptScrapeElement(driver, '//summary[@class="Label Label--success"]', 'Verifitcation')
        
    if isVerified != "Not listed...":
        verified.append("True")
    else:
       verified.append("False")
                
    topics = attemptScrapeElement(driver, '//div[@class="d-inline-flex flex-wrap"]', 'Topics')
    for top in topics:
        if(type(top) != type('String')):
            topicString = topicString + "" + top.text
        else:
            topicString = topicString + "" + top
    topicsList.append(topicString)
    topicString = ''
    print(topicsList)       

    
    #Send organization information to parquet files.
    orgInfoToParquet(finalTotal)


def orgInfoToParquet(finalTotal, organizations, index):
    #This gets all the repositories listed in the repository array and puts them into separate parquet folders, 
    #indexed 0--> # of organizations. The indexes of the files should line up with the org they're from.
    for x in range(0, len(finalTotal)):
        orgDF = pd.DataFrame({'Organization': [organizations[x]], 'Number of People': [finalTotal[x]], 'Number of Projects': [projectsTotal[x]], 'Verified': [verified[x]], 'Number of Followers': [followersTotal[x]], 'Location': [location[x]], 'Website': [website[x]], 'Twitter (X)': [twitter[x]], 'Email': [emails[x]], 'Top Languages': [languageList[x]], 'Top Topics': [topicsList[x]]})
        #toCSV(orgDF)