
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import {useEffect} from 'react'; 

export const TerminalDemo = () => {

    const commandHandler = (text: string) => {
        let response;
        const argsIndex = text.indexOf(' ');
        const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            TerminalService.emit('response', response);
        }
        else {
            TerminalService.emit('clear');
        }
    }

    useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        }
    }, []);

    return (
      <div className="bg-slate-950 text-white p-4 rounded-md font-mono">
        <Terminal 
        className="[&_.p-terminal-input]:bg-transparent
        [&_.p-terminal-input]:outline-none
        " prompt="cameron@entity $" welcomeMessage="type -h for a list of commands"/>
      </div>
    );
}
 
