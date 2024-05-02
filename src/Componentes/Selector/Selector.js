import './Selector.css'

export const Selector= ({ options, set }) => {

    const handleSelection = (e) => {
        set(e.target.value)
    }


    return(
        <select className="colorSelector" onChange={handleSelection}>
            {options.map( (opt) => <option key={opt.id} value={opt.value}>{opt.text}</option> )}
        </select>

    )
}