import { ChangeEvent } from 'react'

type Option<T> = {
  value: T
  title: string
}

type Props<T> = {
  options: Readonly<Array<Option<T>>>
  selectedValue: T
  onSelectedChange: (value: T) => void
}

const Dropdown = <T extends string,>({ options, selectedValue, onSelectedChange }: Props<T>) => {
  const renderOption = ({ value, title }: Option<T>) => {
    return (
      <option key={value} value={value}>
        {title}
      </option>
    )
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectedChange(event.target.value as T)
  }

  return (
    <div style={{ marginTop: 10 }}>
      <select value={selectedValue} onChange={handleChange}>
        {options.map(renderOption)}
      </select>
    </div>
  )
}

export default Dropdown
