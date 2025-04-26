import { LocalAuth } from 'capacitor-local-auth';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    LocalAuth.echo({ value: inputValue })
}
