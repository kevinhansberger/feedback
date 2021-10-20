export default function Emoji({ children }) {
  return (
    <span style={{ fontSize: 24, color: 'black' }} dangerouslySetInnerHTML={{ __html: children }} />
  )
}
