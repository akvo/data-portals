import { FunctionComponent, TableHTMLAttributes } from 'react'

export type ColumnDef = {
  title: string
  align?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit'
}

export interface Props extends TableHTMLAttributes<HTMLTableElement> {
  columns: ColumnDef[]
  data: any[]
}

export const Table: FunctionComponent<Props> = ({
  columns,
  data,
  ...props
}) => {
  return (
    <table {...props}>
      <thead>
        <tr>
          {columns.map((column, i) => (
            <th key={i}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((it, n) => (
          <tr key={n}>
            {columns.map((column, m) => (
              <td
                key={`${n}.${m}`}
                style={column.align ? { textAlign: column.align } : {}}
              >
                {it[column.title]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
