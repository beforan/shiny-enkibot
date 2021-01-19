// Pre-configured ReactMarkdown wrapper for rendering tips

const { Link } = require("@chakra-ui/react");
const ReactMarkdown = require("react-markdown");
const remarkGfm = require("remark-gfm");

const TipsMarkdown = ({ children, ...p }) => (
  <ReactMarkdown
    plugins={[remarkGfm]}
    renderers={{
      link: Link,
    }}
    linkTarget="_blank"
    {...p}
  >
    {children}
  </ReactMarkdown>
);

export default TipsMarkdown;
