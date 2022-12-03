import './App.css';
import React from 'react';
import Dropdown from './Dropdown';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [
        {
          value: 'Oliver Hansen',
          label: 'oliverHansen',
        },
        {
          value: 'Van Henry',
          label: 'vanHenry',
        },
        {
          value: 'April Tucker',
          label: 'aprilTucker',
        },
        {
          value: 'Ralph Hubbard',
          label: 'ralphHubbard',
        },
        {
          value: 'Park Jimin',
          label: 'parkJimin',
        },
        {
          value: 'Kim Taehyung',
          label: 'kimTaehyung',
        },
      ],

      ages: [
        {
          value: 'Twenty',
          label: 'twenty',
        },
        {
          value: 'Twenty one',
          label: 'twentyOne',
        },
        {
          value: 'Twenty one and a half',
          label: 'twentyOneAndAHalf',
        }
      ]
    }
  };

  render() {
    const { tags, ages } = this.state;
    return (
      <div className='app'>
        <div className='app-content'>
          <h3>Single Dropdown</h3>
          <div>
          <Dropdown 
              title="Select age..."
              items={ages}
          />
          </div>
        </div>

        <div className='app-content'>
          <h3>Multiple Dropdown</h3>
          <div>
            <Dropdown 
              title="Select tags..."
              items={tags}
              multiSelect
            />
          </div>
        </div>
      </div>
      
    )
  }
}

export default App;
