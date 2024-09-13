from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By



def attemptScrapeElement(driver, element, scrapedName):
    try:
        elementToReturn = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, element))).text
        #Typically list.append(elementToReturn) here, but we just return the element instead...
        print(elementToReturn)
        return elementToReturn
    except TimeoutException:
        print(scrapedName + f' is not listed, skipping...')
        return 'Not listed...'