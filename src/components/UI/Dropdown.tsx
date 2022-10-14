import Image from 'next/image';
import React from 'react';

type DropdownProp = {
  options: [{
    name: string,
    value: string,
    img?: string,
    description?: string
  }],
  selected: {
    name: string,
    value: string,
    img?: string,
    description?: string
  }
  setSelected: () => void
}

const Dropdown = ({ options, selected, setSelected }: DropdownProp) => {
  const [filter, setFilter] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState(options)

  React.useEffect(() => {
    const filteredData = options.filter((option) => {
      return option.name === filter
    });

    // @ts-ignore
    setFilteredOptions(filteredData)
  }, [filter, options])

  return (
    <div className="select-block">
      <input type="hidden" id="token-to" />
      <button
        type="button"
        className="btn btn-default dropdown-toggle select-custom"
        data-toggle="dropdown"
      >
        <Image
          className="mr-2"
          src={'/img/usdt.svg'}
          alt="USDT Logo"
        />
        {selected.name} <i className="fa-regular fa-chevron-down"></i>
      </button>
      <ul
        className="dropdown-menu scroll-select-list"
        role="menu"
      >

        <div className="form-group search-form">
          <span className="fa-light fa-magnifying-glass form-control-search"></span>
          <input
            type="text"
            className="form-control"
            id="search-token"
            placeholder="Search.."
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </div>

        <div className="listInCustomDropdown">
          {options?.map((option) => (
            <li key={option.value} className="blockchain-icon">
              <div className="media">
                <Image
                  className="mr-2"
                  src="/img/ethereum.svg"
                  alt="Ethereum Logo"
                />
                <div className="media-body">
                  <h6>Ether</h6>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Dropdown;
