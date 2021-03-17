# WebMedia 2018
This repository includes the files/projects/scripts used for the publication of the following paper during the 24th Brazilian Symposium on Multimedia and the Web (Simpósio Brasileiro de Sistemas Multimídia e Web - WebMedia):
> Zimmerle, C., & Gama, K. (2018, October). Reactive CEP: Integrating Complex Event Processing into Web Reactive Languages. In Proceedings of the 24th Brazilian Symposium on Multimedia and the Web (pp. 69-72).

## Reactive CEP Example

This is a web example that aims to demonstrate some operations implemented by the Reactive CEP project. 

### Requirements
 - Internet connection (most JS plugins are accessed via CDN)
 - Browser with JavaScript ECMA 2015 (ES6) support
 - Node.js (server-side) v.8 or higher

### Running
To use the application, you must open the client html file in a browser and run the server. However, first you must execute **once** the following command in a terminal (inside the folder project) to install all the server-side required modules:
> [sudo] npm install

To run the server, execute the following (inside the folder project as well):
> node server [optional time interval]

You can either run the command above before or after accessing the client html file.
Note: The optional time interval sets the time interval (milliseconds) at which the coordinates will be sent to the client. By default, this interval is 30000 (30s), and it is applied from the second coordinate (the first one is dispatched immediately). Thus, after the second emission, each bus coordinate will be received in a total interval of a minute.
