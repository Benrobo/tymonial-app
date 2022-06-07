import SyntaxHighlighter from 'react-syntax-highlighter';
// import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import theme from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';

export function CodeWrapper({ code, language = "javascript" }) {

    return (
        <SyntaxHighlighter language={language} style={theme}>
            {code}
        </SyntaxHighlighter>
    )
}