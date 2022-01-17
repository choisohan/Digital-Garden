---
title: Google SpreadSheets
---

# Sheets functions
### display image
```javascript
=image(INDEX(E:E,ROW()))
```

### return if the string is contained
```javascript
=IF(REGEXMATCH((index(B:B,Row())), "keyword I am looking for"), True, False)
```

### if it's empty
```javascript
=if(isBlank(A1),'True','False')
```

### Referencing the other Sheet values
```javascript
= ('spreadSheet2'!A1)

 = ('spreadSheet2'!A1:A5) 
```


# Use app script
tag : [[google app script]] , [[javascript]]


### 1. Load images on google drive
```javascript
function GdriveFiles() {

  const folderId = '11jHkaTsZc7xvD29ai1gAfyN0kiaglxAv';
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  const source = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = source.getSheetByName('Images');
  const data = [];   
  while (files.hasNext()) {
      const childFile = files.next();
      var info = [ 
        childFile.getLastUpdated(),
        childFile.getName(), 
        childFile.getUrl()
      ];
        data.push(info);
  }
  sheet.getRange(2,1,data.length,data[0].length).setValues(data);

}
```

### 2. Send Email
[official google tutorial](https://developers.google.com/apps-script/articles/sending_emails#goal)
``` javascript

/**
 * Sends non-duplicate emails with data from the current spreadsheet.
 */
function postBlog() {
  //var sheet = SpreadsheetApp.getActiveSheet();
  const source = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = source.getSheetByName('Posts');
  var BLOG_MAIL = sheet.getRange("A1").getValue();//get A1

  var startRow = 4; // First row of data to process
  var lastRow = sheet.getLastRow; 
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var status = row[0]; //A
    if (status == 'Ready') {
      var subject = row[1]; //B
      var message = row[2]; //C
      
      if(dataRange.getCell(i+1,5).isBlank()==false){
        var image = UrlFetchApp.fetch(row[4]).getBlob();
        MailApp.sendEmail(BLOG_MAIL, subject, message, {attachments: [image]});
        console.log(subject,"was sent with an attachment");
      }
      else{
        MailApp.sendEmail(BLOG_MAIL, subject, message);
        console.log(subject,"was sent");
      }
      
      
      sheet.getRange(i+1, 1).setValue('Published');
      SpreadsheetApp.flush();
    }
  }
}
```


# Web Scraping
tag : [[webScraping]]
- [ ] 
- https://builtvisible.com/playing-around-with-importxml-in-google-spreadsheets/
- [How to use ImportXML](https://support.google.com/docs/answer/3093342?hl=en)
```
=IMPORTXML(url, xpath_query)

//example
=IMPORTXML("https://en.wikipedia.org/wiki/Moon_landing", "//a/@href")
```

### Create no-code app with Glideapp
tag : [[GlideApp]]