import type { ReactNode } from "react";
import type { Block } from "@/content/blocks";
import { external } from "@/lib/site";

/** Renders inline markup: [text](href), **bold**, `code`. */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      const ext = /^https?:\/\//.test(href);
      out.push(
        <a key={k++} href={href} {...(ext ? external : {})}>
          {m[1]}
        </a>,
      );
    } else if (m[3]) out.push(<strong key={k++}>{m[3]}</strong>);
    else if (m[4]) out.push(<code key={k++}>{m[4]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ("p" in b)
          return (
            <p key={i}>
              <Inline text={b.p} />
            </p>
          );
        if ("h3" in b) return <h3 key={i}>{b.h3}</h3>;
        if ("ul" in b)
          return (
            <ul key={i}>
              {b.ul.map((t, j) => (
                <li key={j}>
                  <Inline text={t} />
                </li>
              ))}
            </ul>
          );
        if ("ol" in b)
          return (
            <ol key={i}>
              {b.ol.map((t, j) => (
                <li key={j}>
                  <Inline text={t} />
                </li>
              ))}
            </ol>
          );
        if ("code" in b)
          return (
            <pre key={i} className="mono" tabIndex={0} aria-label={`${b.lang ?? "code"} example`}>
              <code>{b.code}</code>
            </pre>
          );
        if ("table" in b)
          return (
            <div key={i} className="tbl" role="region" aria-label="Comparison table" tabIndex={0}>
              <table>
                <thead>
                  <tr>
                    {b.table.head.map((h, j) => (
                      <th key={j} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.table.rows.map((r, j) => (
                    <tr key={j}>
                      {r.map((c, n) =>
                        n === 0 ? (
                          <th key={n} scope="row">
                            <Inline text={c} />
                          </th>
                        ) : (
                          <td key={n}>
                            <Inline text={c} />
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return (
          <blockquote key={i}>
            <p>
              <Inline text={b.quote} />
            </p>
            {b.cite && <cite>{b.cite}</cite>}
          </blockquote>
        );
      })}
    </>
  );
}
