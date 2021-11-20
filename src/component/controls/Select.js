import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value, onChange, options } = props;

    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">Development</MenuItem>
                <MenuItem value="">Marketing</MenuItem>
                <MenuItem value="">Accounting</MenuItem>
                <MenuItem value="">HR</MenuItem>
                <MenuItem value="">Lecturer</MenuItem>


                {
                    // options.map(
                    //     item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    // )
                }
            </MuiSelect>
        </FormControl>
    )
}