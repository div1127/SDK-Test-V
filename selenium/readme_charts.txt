fyi: 
http://docs.sencha.com/sencha_test/guides/command_line_archive_server.html
stc run -o output -p pool -s scenario

I.
1) create storage.json
{
    "secret": {
        "path": "/mystoragearea"
    }
}
2) storage mystoragearea folder
3) Starting the Archive Server in console from place where storage.json is: stc server run

II.
1) run selenium: run_server.bat or run_server_win64.bat (from folder ...SDK-Test\selenium\)

III.
1) start Sencha Studio and choose tab with 'cloude' icon on tab in left bottom corner
2) see webdriver localPool already created in 'SDK-Test' from git - modify if needed
3) choose tab with 'sheeld' icon on tab in left bottom corner, choose 'Setting button' - gear icon
Archive Server: 'http://localhost:1903'
Archive Root Folder: '/mystoragearea' //the same as set in I.1)

IV.
1) in new console: stc run -p localPool -S http://localhost:1903 -K secret -n firstRun -c 192.168.88.199
 - replace 199 with your IP adress
 - run it in valid workspace (SDK-Test\senchaTest\test\modernKS)

