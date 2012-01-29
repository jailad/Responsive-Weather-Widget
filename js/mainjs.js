  $('document').ready(function(){
    
  // used for quickly switching on/off alerts between production mode and dev+debug mode
  var DEBUGMODE = 'F';
    
  // Start: initialload function definition, function which attempts to restore app state from the last time the state was saved in localstorage //
  
  // elements to be loaded are:
  // 1. previously entered search item within the search input box
  // 2. search history elements ( i.e. historical search items)
  // 3. weather information corresponding to input provided in item 1 above
  // 4. news information corresponding to the input provided in item 1 above
    
  function initialload()
  {
    
    // if localstorage is supported
    if('localStorage' in window && window['localStorage'] !== null)
    {
    var store = window.localStorage;   
    
    // state_savedFlag is a flag which is set by the savestate function to TRUE whenever it performs a save
    // This flag indicates to the initial load function to proceed with state restoration

    if( store.getItem('state_savedflag') == 'T' )
    {

        // loading last state
        $("#anylocationinput").val(store.getItem('state_anylocationsearchinput'));
        
        // parsing out space / escape characters
        var userinput = $("#anylocationinput").val().split(' ').join(',');
                
        // getting fresh news and weather for last searched city and location
        displayinformation(userinput);        
                
    }

    }

    else
    {

        // alert('it appears that localstorage may not be supported. currently within initialload loop');
        // if local storage is not supported by the browser, silently exit initialload
    }


  }
  // End: initialload function definition, function which attempts to restore app state from the last time the state was saved in localstorage //


  // Calling initialload 
  initialload();  
  
  // Start: function 'savestate' definition
  // the function below can be called from any place within the code and it's purpose is to save the innerhtml of the crucial elements at any point of time //
  
  function savestate()
  {

    if('localStorage' in window && window['localStorage'] !== null)

    {
    var store = window.localStorage;

     // valid, API way
     store.setItem('state_savedflag', 'T' );
     store.setItem('state_anylocationsearchinput', $("#anylocationinput").val() );
     
     /*
     store.setItem('state_weather', document.getElementById('weatherresults').innerHTML );
     store.setItem('state_news', document.getElementById('newsresults').innerHTML );
     */

    }

    else
    {
       if(DEBUGMODE=='T') alert('Sorry it appears that your browser does not support localstorage. Therefore the application state cannot be saved. ');
    }

  }

  // End: function 'savestate' definition
  
  // Start: function 'savehistory' definition
    
  function savehistory(passedinput)
  {

    if('localStorage' in window && window['localStorage'] !== null)

    {
    var store = window.localStorage;
    
    // there should be a variable which tracks # items stored in history, let's call it historycounter
    // if # items saved is = 0, then nothing has been saved, else some items have been saved    
    // if # items saved is 0, then increase that counter by 1, and add passedinput as value of the key + historyitem + # items stored
    // if # items saved is x, then increase that counter by 1, and add passedinput as value of the key + historyitem + # items stored
    
    
    if(store.getItem('state_historycounter') == null )
    {
          store.setItem('state_historycounter','0');
    }
    
    else
    {
      var currentcounter = parseInt(store.getItem('state_historycounter'));
      currentcounter+=1;
      store.setItem('historyitem' + currentcounter, passedinput );
      store.setItem('state_historycounter',currentcounter);
            
    }


    

    }

    else
    {
       if(DEBUGMODE=='T') alert('Sorry it appears that your browser does not support localstorage.');
    }

  }

  // End: function 'savehistory' definition
  
  // Start: function 'displayhistory' definition
  // this function takes care of displaying the history
    
  function displayhistory()
  {

    if('localStorage' in window && window['localStorage'] !== null)

    {
    var store = window.localStorage;
    
    // if nothing is currently saved ..
    if(store.getItem('state_historycounter') == null )
    {
          
    }
    
    // if some entries have been saved
    else
    {
      
      $("#searchhistory").empty();
      
      var maxitemstoshow = 5 ;
      var historyoutput = '';
      var upperlimit = parseInt(store.getItem('state_historycounter'));
      
      var tempstringvalue='';
      var tempstringid=''
      
      if( upperlimit >= maxitemstoshow )
      {
      var i = upperlimit;        
      for(;i> upperlimit - maxitemstoshow; i--)
      {
          // historyoutput += "<input>" + store.getItem('historyitem'+i) + "</input>";
         
         tempstringvalue = '';
         tempstringvalue += new String(store.getItem("historyitem"+i));
         tempstringvaluefinal = " value='";
         tempstringvaluefinal = tempstringvaluefinal.concat(tempstringvalue).concat("' ");
         //alert(tempstringvaluefinal);
                  
         tempstringid = '';
         tempstringid += new String("historyitem"+i);
         tempstringidfinal = " id='";
         tempstringidfinal = tempstringidfinal.concat(tempstringid).concat("' ");
         //alert(tempstringidfinal);
         
         /*
         tempstringvalue = tempstringvalue.split(' ').join(',');
         tempstringonclick = '';
         tempstringonclick += new String("displayinformation('"+tempstringvalue+"');");
         tempstringonclickfinal = " onclick='";
         tempstringonclickfinal = tempstringonclickfinal.concat(tempstringonclick).concat("' ");
        // alert(tempstringonclickfinal);
         */
         
             
         var stringliteral = '';
         
         stringliteral = stringliteral.concat("<input class='searchhistitem' ");
         stringliteral = stringliteral.concat(tempstringvaluefinal);
         stringliteral = stringliteral.concat(tempstringidfinal);
         //stringliteral = stringliteral.concat(tempstringonclickfinal);//
         stringliteral = stringliteral.concat(" readonly='readonly'/> ");
         
         if(DEBUGMODE=='T') alert(stringliteral);
         
         historyoutput += stringliteral;
      
       
      }
        
      }
      
      else
      {
       
      var i = upperlimit;
        
      for(;i>=1; i--)
      {
          // historyoutput += "<input>" + store.getItem('historyitem'+i) + "</input>";
         
         tempstringvalue = '';
         tempstringvalue += new String(store.getItem("historyitem"+i));
         tempstringvaluefinal = " value='";
         tempstringvaluefinal = tempstringvaluefinal.concat(tempstringvalue).concat("' ");
         //alert(tempstringvaluefinal);
                  
         tempstringid = '';
         tempstringid += new String("historyitem"+i);
         tempstringidfinal = " id='";
         tempstringidfinal = tempstringidfinal.concat(tempstringid).concat("' ");
         //alert(tempstringidfinal);
         
         /*tempstringvalue = tempstringvalue.split(' ').join(',');
         tempstringonclick = '';
         tempstringonclick += new String("displayinformation('"+tempstringvalue+"');");
         tempstringonclickfinal = " onclick='";
         tempstringonclickfinal = tempstringonclickfinal.concat(tempstringonclick).concat("' ");
         */
         //alert(tempstringonclickfinal);
             
         var stringliteral = '';
         
         stringliteral = stringliteral.concat("<input class='searchhistitem' ");
         stringliteral = stringliteral.concat(tempstringvaluefinal);
         stringliteral = stringliteral.concat(tempstringidfinal);
        // stringliteral = stringliteral.concat(tempstringonclickfinal);
         stringliteral = stringliteral.concat(" readonly='readonly'/> ");
         
         if(DEBUGMODE=='T')  alert(stringliteral);
         
         historyoutput += stringliteral;
               
      }
        
      }  
      
      
      
      document.getElementById('searchhistory').innerHTML += historyoutput;
      
    }
      
         

     
    }

    else
    {
       if(DEBUGMODE=='T') alert('Sorry it appears that your browser does not support localstorage.');
    }

  }
  
  
  $('input').click(function()
                   
                   {
    
  if(DEBUGMODE=='T') alert('i believe i was clicked'); }
  
  );
  
  
    
  
 
  // End: function 'displayhistory' definition
  
  /*
 
  $("searchhistory > input").click(function () {

      // Put an animated GIF image inside of content
      $("#weatherresults").empty().html('<table width=100%><tr><td align=center><img src="images/loading1.gif" /></td></tr></table>');
      $("#newsresults").empty().html('<table width=100%><tr><td align=center><img src="images/loading1.gif" /></td></tr></table>');
      
      var userinput = this.attr("value");


     // in the code below, I am making sure that the user only enters alphanumeric characters since non alnum characters can lead to query errors
     // a better implementation would be to use urlencoding
     // furthermore, since I use google's geocoding service to convert user's input to lat,long so
     // the input is much more accepting of typos like 'aaatlanta' or '@tlanta' or '@tlanta in' [atlanta, indianapolis]
     
     var userinput = this.val().split('[').join(',').split('+').join(',').split('_').join(',').split('-').join(',').split(')').join(',').split('(').join(',').split('*').join(',').split('&').join(',').split('^').join(',').split('%').join(',').split('$').join(',').split('#').join(',').split('@').join(',').split('!').join(',').split('~').join(',').split(' ').join(',').split('`').join(',');

      // line below was used at time of debugging and is hence commented out //
      alert(userinput);

      displayinformation(userinput);
      
      
      
      
      

    });
  */
  
  // Start: function displayinformation
  // displayinformation is used to abstract the process of getting and inserting information on the page under different situations ( local search, history search, any search) since similar update tasks have to be performed in all cases
  // thanks to the displayinformation function, the only task which all the click handlers essentially have to do is to properly format user's input ( i.e. eliminate some unwanted characters), and pass over the cleaned input to the display information function which takes care of doing the heavy lifting api calls and html modifications

  function displayinformation(userinput)
  {

     // Function start

     /* Converting any input location to equivalent latitude, longitude for a uniform query input and result set */
     /* this also helps with mis-spelt city names and in also catching slightly difficult situations like atlanta, indianapolis versus atlanta, ga*/


      var yqlgooglegeocodeurl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Faddress%3D';
      yqlgooglegeocodeurl += userinput;
      yqlgooglegeocodeurl += '%26sensor%3Dfalse%22&format=json';

      /* line below was used at time of debugging and is hence commented out */
      if(DEBUGMODE=='T') alert(yqlgooglegeocodeurl);

    $.getJSON(yqlgooglegeocodeurl, function(data){

       /* line below was used at time of debugging and is hence commented out
      respstring = JSON.stringify(data);
      alert(respstring);
      */

      /* TODO: if geocoding fails, then the structure data.query.results.json is inaccurate and causes exception against which I need to protect */

      // start: sometimes geocoding api fails and the if statement below takes care of that case //
      
      if(data.query.count == 0 )
      {
        if(DEBUGMODE=='T') alert("within location loop: sorry no results were returned");

        var weathererrormessage = "<br><div> ";
        weathererrormessage += "Sorry, no weather results were returned for the specified location. Please re-try with a different, or more specific location.";
        weathererrormessage += "</div><br>";

        var newserrormessage = "<p class=errorresults> ";
        newserrormessage += "Sorry, no news results were returned for the specified location. Please re-try with a different, or more specific location.";
        newserrormessage += "</p>";

        $("#weatherresults").empty();
        $("#newsresults").empty();

        document.getElementById('weatherresults').innerHTML += weathererrormessage;
        document.getElementById('newsresults').innerHTML += newserrormessage;
        
        // todo
        // savestate();

      }
      
      // end: sometimes geocoding api fails and the if statement below takes care of that case //

      // start: when call to the geocoding was not erroneous //
      else
      {

      /* start: if call to the geocoding api was successful, but yielded in zero results  */
      if(data.query.results.json.status == "ZERO_RESULTS" )
      {
        if(DEBUGMODE=='T') alert("within location loop: sorry no results were returned");

        var weathererrormessage = "<br><div> ";
        weathererrormessage += "Sorry, no weather results were returned for the specified location. Please re-try with a different, or more specific location.";
        weathererrormessage += "</div><br>";

        var newserrormessage = "<p class=errorresults> ";
        newserrormessage += "Sorry, no news results were returned for the specified location. Please re-try with a different, or more specific location.";
        newserrormessage += "</p>";

        $("#weatherresults").empty();
        $("#newsresults").empty();

        document.getElementById('weatherresults').innerHTML += weathererrormessage;
        document.getElementById('newsresults').innerHTML += newserrormessage;
        
        //todo
        // savestate();


      }
      /* end: if call to the geocoding api was successful, but yielded in zero results  */



      /* start: section if user's location input ( which has also been 'cleansed' ) results in successful geocoding  */

      else if ( data.query.results.json.status == "OK"  )
      {

       /* start: ensuring that the returned location type is a city, since json structure returned depends upon type of location other types of locations can be routes, airport etc.
          In the statement below locality => City .
       */

       // TODO: Ironically the statement below will fail / cause Javascript error if the location is not of type city or if the returned result is an array type. need to fix this with json.parse and/or error handling //

       if(data.query.results.json.results.types[0]== "locality" )
       {
       // dev / experimental code
       // var locationcomponents = data.query.results.json.results.address_components;
       // alert('Formatted address: ' + data.query.results.json.results.formatted_address );
       // alert('Address Components: ' + locationcomponents[0].long_name );
       //  alert('Latitude: ' + data.query.results.json.results.geometry.location.lat );
       // alert('Longitude: ' + data.query.results.json.results.geometry.location.lng );
        if(DEBUGMODE=='T') alert("Locality/City, successfully found !");

       // fetching location specific information elements like: 1. latitude 2. longitude 3. properly formatted address 
       var locationlatitude =  data.query.results.json.results.geometry.location.lat;
       var locationlongitude = data.query.results.json.results.geometry.location.lng;
       var locationformattedaddress = data.query.results.json.results.formatted_address;
       
       // now that we have the properly formatted address, it makes sense to save the formatted address as a history item
       savehistory(locationformattedaddress);

       // setting user's input to the fetched formatted address ( looks good that way! and also provides a feedback to the user that we have accurately interpreted the input )
       $("#anylocationinput").val(locationformattedaddress);

       // building up the URL for the worldweatheronline service
       // it seemed to bit unreliable on 2/14/2011, hence I plan to use 'view-source:http://api.geonames.org/findNearByWeatherJSON?lat=43&lng=-2&username=demo&callback=?' service as a backup if the need arises
       // however, even with the above backup service, I used a demo account, and it intermittently expires depending upon the usage

       var weathernewsurl = 'http://www.worldweatheronline.com/feed/weather.ashx?num_of_days=5&key=9adddd1834034647110902&format=json';
       weathernewsurl += '&q=';
       weathernewsurl += locationlatitude;
       weathernewsurl += ',';
       weathernewsurl += locationlongitude;
       weathernewsurl += '&callback=?';

       if(DEBUGMODE=='T') alert("weathernewsurl is:" + weathernewsurl);

       /* start: fetching weather information from the above service  */

       $.getJSON(weathernewsurl, function(weatherdata){

       // alert below was used to check for debug information, was commented out after it worked
       // alert(JSON.stringify(weatherdata));
       // alert(JSON.stringify(weatherdata.data.current_condition[0]));
       // alert(JSON.stringify(weatherdata.data.current_condition[0].cloudcover));
       // alert(JSON.stringify(weatherdata.data.weather[0].date));
       // alert(JSON.stringify(weatherdata.data.weather));

       var localtimestamp_weatherdata = (new Date()).toLocaleString();
       var weatheritems = weatherdata.data.weather;
       var maxweatherdays = 3;
       var weatheroutput = '';

       var weatheroutput = '<table width=100%><tr>';

       for(var j=0;j<maxweatherdays;j++)
        {
         /*$("#newsresults").append('<a/>');*/
          var wdate = weatheritems[j].date;
          weatheroutput += "<td>"
          weatheroutput += "<p>"
          weatheroutput += "<B>Date:</B>" + wdate + "<br>";
          weatheroutput += "<B>Max Temp(&deg;F):</B>" + weatheritems[j].tempMaxF + "<br>";
          weatheroutput += "<B>Min Temp(&deg;F):</B>" + weatheritems[j].tempMinF + "<br>";
          weatheroutput += "<B>Condition :</B>" + weatheritems[j].weatherDesc[0].value + "<br>";
          weatheroutput += "</p>";
          weatheroutput += "</td>"
        }

        weatheroutput += '</tr><tr><td colspan=3>';
        
        weatheroutput += "<aside>Last Updated: " + localtimestamp_weatherdata + "</aside>" ;
        
        weatheroutput += '</td></tr></table>';

        $("#weatherresults").empty();
        document.getElementById('weatherresults').innerHTML += weatheroutput;
        
        if(DEBUGMODE=='T') alert('End of loop ; Displayed the weather info');
        
        
        
       });

      /* end: fetching weather information from the above service  */




      /* Start: News Section */
      // Note that in the above section, we have already identified the city and have displayed it in a properly formatted manner within the input box       // once we have the exact city, we can use this properly formatted place name to provide a more accurate input to google news ( rather than using the literal values as provided by the user)
      // I am therefore modifying the variable userinput to have a slightly modified version of the identified location

      userinput = $("#anylocationinput").val().split(' ').join(',');

      var yqlgooglenewsurl = 'http://query.yahooapis.com/v1/public/yql?q=select%20title%2C%20link%2C%20description%20from%20rss%20where%20url%20%3D%20%22http%3A%2F%2Fnews.google.com%2Fnews%3Fgeo%3D';
      yqlgooglenewsurl += userinput;
      yqlgooglenewsurl += '%26output%3Drss%22&format=json';


       /* line below was used at time of debugging and is hence commented out
      alert(yqlgooglenewsurl);
       */

    $.getJSON(yqlgooglenewsurl, function(data){

       /* line below was used at time of debugging and is hence commented out
      respstring = JSON.stringify(data);
      alert(respstring);
      */

      // TODO : correct the code below so that google news uses google's geocoding instead of user input directly
      if(data.query.results == null)
      {
        $("#newsresults").empty();
        $("#newsresults").append("Sorry, no news results were returned for the specified location");
        $("#weatherresults").empty();
      }

      else
      {

       var localtimestamp_newsdata = (new Date()).toLocaleString();
       var items = data.query.results.item;
       var maxnewsitems = 5;
       var output = '';
       var no_items=items.length;

        for(var i=0;i<maxnewsitems;i++)
        {
         /*$("#newsresults").append('<a/>');*/
          var title = items[i].title;
          var link = items[i].link;
          output += "<a href='" + link + "'>"+title+"</a>";
        }
        
        output += "<br>";
        
        output += "<aside>Last Updated: " + localtimestamp_newsdata + "</aside>" ;


      // statement below was used before the weather fetching piece of this app was done as an experiment
      // $("#weatherresults").empty();

        $("#newsresults").empty();
        document.getElementById('newsresults').innerHTML += output;
        
        //todo         
        
        
      }
      
       
    });

    /* End: News Section */
    
    //todo
    if(DEBUGMODE=='T') alert(document.getElementById('newsresults').innerHTML);
    if(DEBUGMODE=='T') alert(document.getElementById('weatherresults').innerHTML);
    
    savestate();
    
    //todo
    displayhistory();
    


      }

      /* end: ensuring that the returned location type is a city,
since json structure returned depends upon type of location */

      /* start: if the returned location type is not a city */
      else
      {
        if(DEBUGMODE=='T') alert("location was detected, but does not seem to be a city");

        var weathererrormessage = "<br><div> ";
        weathererrormessage += "Sorry, no weather results are available. While the location was detected, but it is either not a city, or covers a broad geographical region. Please re-try with a different, or more specific location.";
        weathererrormessage += "</div><br>";

        var newserrormessage = "<p class=errorresults> "; 
        newserrormessage += "Sorry, no weather results are available. While the location was detected, but it is either not a city, or covers a broad geographical region. Please re-try with a different, or more specific location.";
        newserrormessage += "</p>";

        $("#weatherresults").empty();
        $("#newsresults").empty();

        document.getElementById('weatherresults').innerHTML += weathererrormessage;
        document.getElementById('newsresults').innerHTML += newserrormessage;
      }
      /* end: if the returned location type is not a city */

      }

      // end: when call to the geocoding was not erroneous //

      /* end: section if user's location input ( which has also been 'cleansed' ) results in successful geocoding */

      }

         // once displayinformation has done it's job, we want to save the current application state so that this can be used
         // later on at the time of loading the app


    });

       /* End of Converting any input location to equivalent latitude,
longitude for a uniform query input and result set */



  }


    try
         {

    

     $("#locallocationsearch").click(function () {

     // alert("Local Location Search");

      if (navigator.geolocation)
      {
        if(DEBUGMODE=='T') alert('browser supports geolocation');
        // todo: remove this
        // displayinformation('newnan,ga,30265');

     
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {maximumAge:200, timeout:0});

    function successCallback(position) {
      
      // By using a 'timeout' of 0 milliseconds, if there is no suitable cached position available, the user agent will aynchronously invoke the error callback with code TIMEOUT and will not initiate a new position acquisition process.
      // alert(JSON.stringify(position));
      // alert(JSON.stringify(position.coords));

      if(DEBUGMODE=='T') alert('The detected latitude is: ' + JSON.stringify(position.coords.latitude));
      if(DEBUGMODE=='T') alert('The detected longitude is: ' + JSON.stringify(position.coords.longitude));
      if(DEBUGMODE=='T') alert('The detected accuracy is: ' + JSON.stringify(position.coords.accuracy));
      // alert('proceeding to make the api call');;


      var yqlgooglereversegeocodeurl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Faddress%3D';
      yqlgooglereversegeocodeurl += JSON.stringify(position.coords.latitude);
      yqlgooglereversegeocodeurl += ',';
      yqlgooglereversegeocodeurl += JSON.stringify(position.coords.longitude);
      yqlgooglereversegeocodeurl += '%26sensor%3Dfalse%22&format=json';

      if(DEBUGMODE=='T') alert(yqlgooglereversegeocodeurl);



       $.getJSON(yqlgooglereversegeocodeurl, function(locdata){

       /* line below was used at time of debugging and is hence commented out
      respstring = JSON.stringify(data);
      alert(respstring);
      */

      /* TODO: if geocoding fails, then the structure data.query.results.json is inaccurate and causes exception against which I need to protect */

      // start: sometimes geocoding api fails and the if statement below takes care of that case //
      if(locdata.query.count == 0 )
      {
        
        alert('Sorry it seems that the GeoCoding API may have failed');

      }
      // end: sometimes geocoding api fails and the if statement below takes care of that case //


      // start: if call to the geocoding api was successful //

      else
      {

      /* start: if call to the geocoding api was successful, but yielded in zero results  */
      if(locdata.query.results.json.status == "ZERO_RESULTS" )
      {
        alert('Sorry no results were returned');
        
        }      
      /* end: if call to the geocoding api was successful, but yielded in zero results  */

      /* start: section if user's location input ( which has also been 'cleansed' ) results in successful geocoding  */

      else if ( locdata.query.results.json.status == "OK"  )
      {

        // this line below was used at development, hence commented out
        // alert(locdata.query.results.json.results.formatted_address);
        
        //var localaddressstring = locdata.query.results.json.results.formatted_address;
        // alert(localaddressstring);
        // var localaddresssplit = localaddressstring.split(",");
        // alert(localaddresssplit[0]);
        
        var mylocstring = locdata.query.results.json.results.formatted_address;
        var mylocstringsplit = mylocstring.split(',');
        mylocstring = mylocstringsplit[1] + mylocstringsplit[2];
        // alert(mylocstring);
        
        // todo: need to re-check the code below if it fires / works properly, if it doesn't then you can either use IP based geolocation, OR, call the displayinfo function after properly unescaping split[1] + split[2]
        $("#anylocationinput").val(mylocstring);
        $('#anylocationsearch').trigger('click');


      }

      /* end: section if user's location input ( which has also been 'cleansed' ) results in successful geocoding  */


      }


      // end: if call to the geocoding api was successful //


       });

      // 



      // the example below shows a sample 'perfect' api call structure to get my local location
      // http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D"http://maps.googleapis.com/maps/api/geocode/json%3Faddress%3D33.3944413,-84.7688161%26sensor%3Dfalse"&format=json

    }

    function errorCallback(error) {
      switch(error.code) {
        case error.TIMEOUT:
          // Quick fallback when no suitable cached position exists.
          doFallback();
          // Acquire a new position object.
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
          break;

      };
    }

    function doFallback() {
      // No fresh enough cached position available.
      // Fallback to a default position.
     // alert('sorry, unable to determine your position');
    }


      }

      else
      {
        alert('It appears that your browser doesnt support geolocation, do you want to use IP based location determination instead, it may not be as accurate as browsers geolocation function but may work');
      }

     });
     
         


    $("#anylocationsearch").click(function () {

      // Put an animated GIF image inside of content
      $("#weatherresults").empty().html('<table width=100%><tr><td align=center><img src="images/loading1.gif" /></td></tr></table>');
      $("#newsresults").empty().html('<table width=100%><tr><td align=center><img src="images/loading1.gif" /></td></tr></table>');
      


     // in the code below, I am making sure that the user only enters alphanumeric characters since non alnum characters can lead to query errors
     // a better implementation would be to use urlencoding
     // furthermore, since I use google's geocoding service to convert user's input to lat,long so
     // the input is much more accepting of typos like 'aaatlanta' or '@tlanta' or '@tlanta in' [atlanta, indianapolis]
     
     var userinput = $("#anylocationinput").val().split('[').join(',').split('+').join(',').split('_').join(',').split('-').join(',').split(')').join(',').split('(').join(',').split('*').join(',').split('&').join(',').split('^').join(',').split('%').join(',').split('$').join(',').split('#').join(',').split('@').join(',').split('!').join(',').split('~').join(',').split(' ').join(',').split('`').join(',');

      // line below was used at time of debugging and is hence commented out //
      // alert(userinput);

      displayinformation(userinput);
      
      
      
      
      

    });
    
     $("#historyitem40").click(function () {

      // Put an animated GIF image inside of content
      $("#weatherresults").empty().html('<table width=100%><tr><td align=center><img src="images/loading1.gif" /></td></tr></table>');
      $("#newsresults").empty().html('<table width=100%><tr><td align=center><img src="images/loading1.gif" /></td></tr></table>');
      


     // in the code below, I am making sure that the user only enters alphanumeric characters since non alnum characters can lead to query errors
     // a better implementation would be to use urlencoding
     // furthermore, since I use google's geocoding service to convert user's input to lat,long so
     // the input is much more accepting of typos like 'aaatlanta' or '@tlanta' or '@tlanta in' [atlanta, indianapolis]
     
     //var userinput = $("#anylocationinput").val().split('[').join(',').split('+').join(',').split('_').join(',').split('-').join(',').split(')').join(',').split('(').join(',').split('*').join(',').split('&').join(',').split('^').join(',').split('%').join(',').split('$').join(',').split('#').join(',').split('@').join(',').split('!').join(',').split('~').join(',').split(' ').join(',').split('`').join(',');

      // line below was used at time of debugging and is hence commented out //
      // alert(userinput);

      //displayinformation(userinput);
      
      
      
      
      

    });
    
    
     
    
    // this is where anylocationsearch.click function ends


    }
    // end: exception catching block

         catch(err)
         {
            alert(err.message + "<br/>");
         }

    });
