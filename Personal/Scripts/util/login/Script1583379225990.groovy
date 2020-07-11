import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable

WebUI.openBrowser('http://localhost:8080/')

WebUI.setViewPortSize(1200, 800)

WebUI.waitForElementVisible(findTestObject('util/login/login_link'), 15)

WebUI.click(findTestObject('util/login/login_link'))

WebUI.waitForElementVisible(findTestObject('util/login/login_email_input'), 10)

WebUI.setText(findTestObject('util/login/login_email_input'), 'hi@me.com')

WebUI.setText(findTestObject('util/login/login_password_input'), 'Password123')

WebUI.click(findTestObject('util/login/login_submit_button'))

WebUI.waitForElementVisible(findTestObject('util/login/welcome_text'), 10)

