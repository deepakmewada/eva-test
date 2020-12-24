import React from 'react';

const OptionArray = [
  {
    title: "BTC",
    value: "BTC"
  },
  {
    title:"LTC",
    value:"LTC"
  },
  {
    title:"NMC",
    value:"NMC"
  },
  {
    title:"PPC",
    value:"PPC"
  },
  {
    title:"XPR",
    value:"XPR"
  },
  {
    title:"XPM",
    value:"XPM"
  },
  {
    title:"AUR",
    value:"AUR"
  },
  {
    title:"ETC",
    value:"ETC"
  },
  {
    title:"XLM",
    value:"XLM"
  },
  {
    title:"XMR",
    value:"XMR"
  },
  {
    title:"NEO",
    value:"NEO"
  }
]


const SelectOptions = (props) => {
    const currAName = props.value.currAName;
    const currBName = props.value.currBName;
    const handleFirstSelect = props.events.handleFirstSelect;
    const handleSecondSelect = props.events.handleSecondSelect;
  return (
    <>
    <div className="select_wrap">
    <select id="select_one" defaultValue="BTC" onChange={handleFirstSelect} value={currAName}> 
        {
          OptionArray.map((item, key) => 
            <option key={key} value={item.value}>{item.title}</option>
          )
        }
        </select>
        <select id="select_two" defaultValue="LTC" onChange={handleSecondSelect} value={currBName}>
        {
          OptionArray.map((item, key) => 
            <option  key={key+10} value={item.value}>{item.title}</option>
          )
        }
        </select>
    </div>
    </>
  );
}

export default SelectOptions;