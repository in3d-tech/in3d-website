export function Button({ idx, name, style, color, onChange }) {
  return (
    <button
      onClick={() => onChange(idx)}
      className={`nav-expl-btn ${color}`}
      style={style ? style : null}
    >
      <span className="nav-expl-span">{name}</span>
      <i className="nav-expl-i"></i>
    </button>
  );
}