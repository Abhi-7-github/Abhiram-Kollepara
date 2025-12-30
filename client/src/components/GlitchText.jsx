export default function GlitchText({ as: Tag = 'span', text, className = '' }) {
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}
