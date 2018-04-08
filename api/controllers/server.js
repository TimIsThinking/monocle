var sc = require('windows-service-controller');

exports.get_server_state = (req, res) => {
  sc.query({
      // Specifies a service to query.
      name: 'Top Hat Engineers', 

      // Specifies what to enumerate and the type. The default type is service.
      class: 'service',

      // Specifies the started state of the service for which to enumerate. 
      // The default state is active.
      state: 'all'
  })
  .catch(error => { 
      console.log(error.message);
      res.status(400).send(error);
  })
  .done(details => { 
    res.status(200).json(details);
  });
};

exports.start_server = (req, res) => {
  sc.timeout(120);
  sc.pollInterval(5);
  sc.start('Top Hat Engineers')
  .catch(error => { 
      console.log(error.message);
      res.status(400).send(error);
  })
  .done(details => { 
    res.status(200).json('Server started');
  });
};

exports.stop_server = (req, res) => {
  sc.timeout(120);
  sc.pollInterval(5);
  sc.stop('Top Hat Engineers')
  .catch(error => { 
      console.log(error.message);
      res.status(400).send(error);
  })
  .done(details => { 
    res.status(200).json('Server stopped');
  });
};

// @echo off
// set service="Top Hat Engineers"
// set serviceString=Top Hat Engineers
// set timedRestart=true
// set checkCount=0
// set timer=540
// set timeToRestart=540
// set serverMessages=true
// set affinity=240

// :start
// sc start %service%
// echo Error level: %ERRORLEVEL%

// if %ERRORLEVEL% == 0 (
// 	echo Server starting ...
// 	goto setAffinity
// 	goto loop
// )
// if %ERRORLEVEL% == 1056 (
// 	goto loop
// )
// if %ERRORLEVEL% == 1 (
// 	goto error
// )

// :setAffinity
// echo Setting affinty to %affinity%
// for /f "tokens=2 delims==: " %%a in ('sc queryEx %service% ^| find "PID"') do set /a pid=%%a
// powershell -Command "& {$Process = get-process -id %pid%; $Process.ProcessorAffinity=%affinity%;}"
// goto loop

// :error
// echo There was a problem!
// pause
// exit

// :loop
// timeout /t 60 /nobreak
// cls
// sc query %service% | find "RUNNING"

// if %ERRORLEVEL% == 0 (
// 	rem cls
// 	echo Query value: %ERRORLEVEL%
// 	echo %checkCount%: Running
// 	set /a checkCount=%checkCount%+1
// ) else (
// 	echo %checkCount%: Not running
// 	set checkCount=0
// 	goto start
// )

// if %timedRestart% == true (
// 	if %serverMessages% == true (
// 		set /a timeToRestart=%timer%-%checkCount%
// 		if 30 == %timeToRestart% (
// 			echo Server will restart in %timeToRestart% minutes...
// 			echo Server will restart in %timeToRestart% minutes...>>"C:\ProgramData\MedievalEngineersDedicated\%serviceString%\Storage\900367518\SendMessageHere.txt"
// 		)
// 		if 15 == %timeToRestart% (
// 			echo Server will restart in %timeToRestart% minutes...
// 			echo Server will restart in %timeToRestart% minutes...>>"C:\ProgramData\MedievalEngineersDedicated\%serviceString%\Storage\900367518\SendMessageHere.txt"
// 		)
// 		if 10 == %timeToRestart% (
// 			echo Server will restart in %timeToRestart% minutes...
// 			echo Server will restart in %timeToRestart% minutes...>>"C:\ProgramData\MedievalEngineersDedicated\%serviceString%\Storage\900367518\SendMessageHere.txt"
// 		)
// 		if 5 GEQ %timeToRestart% (
// 			echo Server will restart in %timeToRestart% minutes...
// 			echo Server will restart in %timeToRestart% minutes...>>"C:\ProgramData\MedievalEngineersDedicated\%serviceString%\Storage\900367518\SendMessageHere.txt"
// 		)
// 	)
// 	if %checkCount% GTR %timer% (
// 		sc stop %service%
// 		echo %ERRORLEVEL%
		
// 		set checkCount=0
// 		set timeToRestart=%timer%
		
// 		timeout /t 60 /nobreak
// 		goto start
// 	)
// )

// goto loop
// pause