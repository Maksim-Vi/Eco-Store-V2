import { Box, Checkbox, FormControlLabel } from '@material-ui/core'
import React from 'react'

export const CheckboxSelectProduct = () => {

    const [checked, setChecked] = React.useState({
        Images: true,
        Colors: false,
    });

    const handleChange = (event) => {
        if(event.target.name === 'Images'){
            setChecked({  
                Images: true,
                Colors: false, 
            });
        } else {
            setChecked({  
                Images: false,
                Colors: true, 
            });
        }  
    };

    return (
        <Box component="div">
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked.Images}
                        onChange={handleChange}
                        name="Images"
                        color="primary"
                    />
                }
                label="Добаить картинки"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked.Colors}
                        onChange={handleChange}
                        name="Colors"
                        color="primary"
                    />
                }
                label="Добаить цвета"
            />
        </Box>
    )
}
