const sc = require('windows-service-controller');
const Server = require('../models/server');

get_server_state = (req, res) => {

  Server.findOne({ _id: req.params.server_id }, (err, server) => {
    if (err) return res.status(404).json({
      message: "No server exists with this ID."
    });
    sc.query({
      // Specifies a service to query.
      name: server.name, 

      // Specifies what to enumerate and the type. The default type is service.
      class: 'service',

      // Specifies the started state of the service for which to enumerate. 
      // The default state is active.
      state: 'all'
    })
    .catch(error => { 
        error.message === 'The specified service does not exust as an installed service.' 
        ? res.status(404).json({ message: error.message })
        : res.status(400).json({ message: error.message })
        
    })
    .done(details => {
      res.status(200).json(details);
    });
  })
};

start_server = (req, res) => {

  Server.findOne({ _id: req.params.server_id }, (err, server) => {
    if (err) return res.status(404).json({
      message: "No server exists with this ID."
    });

    if (!server.serviceName) return res.status(400).json({
      message: "This server does not have a service name property."
    })

    sc.timeout(120);
    sc.pollInterval(5);
    sc.start(server.serviceName)
    .catch(error => { 
        console.log(error.message);
        res.status(400).send(error);
    })
    .done(() => { 
      console.log('Server started')
    });

    res.status(200).json({
      message: 'Server is starting',
      state: {
        code: 2,
        name: 'START_PENDING'
      }
    });
  })
};

stop_server = (req, res) => {

  Server.findOne({ _id: req.params.server_id }, (err, server) => {
    if (err) return res.status(404).json({
      message: "No server exists with this ID."
    });

    if (!server.serviceName) return res.status(400).json({
      message: "This server does not have a service name property."
    })

    sc.timeout(120);
    sc.pollInterval(5);
    sc.stop(server.serviceName)
    .catch(error => { 
        console.log(error.message);
        res.status(400).send(error);
    })
    .done(details => { 
      console.log('Server stopped')
    });

    res.status(200).json({
      message: 'Server is stopping',
      state: {
        code: 3,
        name: 'STOP_PENDING'
      }
    });
  })
};

list_servers = (req, res) => {

  Server.find({}, (err, servers) => {
      if (err) return res.status(500).send("There was a problem finding servers from the database.");
      res.status(200).send(servers.map(server => ({
          id: server._id,
          name: server.name,
          serviceName: server.serviceName,
          address: server.address,
          port: server.port
      })));
  })
}

create_server = (req, res) => {

  const server = {
    name: req.body.name,
    serviceName: req.body.serviceName || req.body.name,
    address: req.body.address,
    port: req.body.port
  }

  Server.create(server, (err, server) => {
      if (err) return res.status(500).send("There was a problem adding the server to the database.");
      res.status(200).send({
          id: server._id,
          name: server.name,
          serviceName: server.serviceName || server.name,
          address: server.address,
          port: server.port
      });
  })
}

update_server = (req, res) => {

  Server.findByIdAndUpdate(req.params.server_id, req.body, (err, server) => {
      if (err) return res.status(500).send("There was a problem updating the server.");
      
      res.status(200).send({
          id: server._id,
          name: server.name,
          serviceName: server.serviceName || server.name,
          address: server.address,
          port: server.port
      });
  })
}

delete_server = (req, res) => {

  Server.findByIdAndRemove(req.params.server_id, (err, server) => {
      if (err) return res.status(500).send("There was a problem deleting the server.");
      
      res.status(200).send({
          id: server._id,
          message: "Server deleted successfully"
      });
  })
}

module.exports = {
  get_server_state,
  start_server,
  stop_server,
  list_servers,
  create_server,
  update_server,
  delete_server
}

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