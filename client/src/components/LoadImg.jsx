export default function LoadImg({src,...rest}) {
  src = src && src.includes('https://')
    ? src
    : 'http://127.0.0.1:5000/api/uploads/'+src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}