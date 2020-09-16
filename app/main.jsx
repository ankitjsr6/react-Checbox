import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import products from './products.json';

class App extends React.Component {
    lastSelectedIndex = 0;
    state = {
        data: products.map(dataItem => Object.assign({ selected: false }, dataItem))
    }

    selectionChange = (event) => {
        const data = this.state.data.map(item=>{
            if(item.ProductID === event.dataItem.ProductID){
                item.selected = !event.dataItem.selected;
            }
            return item;
        });
        this.setState({ data });
    }
    rowClick = event => {
        let last = this.lastSelectedIndex;
        const data = [...this.state.data];
        const current = data.findIndex(dataItem => dataItem === event.dataItem);

        if (!event.nativeEvent.shiftKey) {
            this.lastSelectedIndex = last = current;
        }

        if (!event.nativeEvent.ctrlKey) {
            data.forEach(item => (item.selected = false));
        }
        const select = !event.dataItem.selected;
        for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
            data[i].selected = select;
        }
        this.setState({ data });
    };

    headerSelectionChange = (event) => {
        const checked = event.syntheticEvent.target.checked;
        const data = this.state.data.map(item=>{
            item.selected = checked;
            return item;
        });
        this.setState({ data },()=>{console.log(this.state.data)});
    }

    render() {
        return (
            <div>
                <Grid
                    data={this.state.data}
                    style={{ height: '400px' }}
                    selectedField="selected"
                    onSelectionChange={this.selectionChange}
                    onHeaderSelectionChange={this.headerSelectionChange}
                    onRowClick={this.rowClick}
                >
                    <Column
                        field="selected"
                        width="50px"
                        headerSelectionValue={
                            this.state.data.findIndex(dataItem => dataItem.selected === false) === -1
                        } />
                    <Column field="ProductName" title="Product Name" width="300px" />
                    <Column field="UnitsInStock" title="Units In Stock" />
                    <Column field="UnitsOnOrder" title="Units On Order" />
                    <Column field="ReorderLevel" title="Reorder Level" />
                </Grid>
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);
