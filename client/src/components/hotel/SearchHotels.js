import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { UserContext } from '../../context/UserContext';



   function useQuery() {
    return new URLSearchParams(useLocation().search);
  }


function SearchHotels (props) {

 
    const [search, setSearch] = useState('');
    const [userContext, setUserContext] = useContext(UserContext);

    const {toggleSearchDone} = props;

    const query = useQuery();
    const searchQuery = query.get('searchQuery');
    const navigate = useNavigate();

    const searchHotels = async (searchQuery) => {
        toggleSearchDone();
        if(search.trim()) {
        const res = await axios.get(`/hotels/search?searchQuery=${search || 'none'}`);
        setUserContext(oldValues => {
            return { ...oldValues, searchHotels: res.data };
        })

        navigate(`/hotels/search?searchQuery=${search || 'none'}`);
        
        setTimeout(() => {setSearch(''); toggleSearchDone()}, 3000);
     
        }
        
        else {
            navigate('/')
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchHotels();
        }
    }

    return(
    // <Box sx={{background:'#F48FB1', borderRadius:'1%', boxShadow:'0 0 30px 6px #F5F5F5', margin: '2% auto' }}>
        <Stack 
            // direction={{xs:'column', sm: 'row'}}    
            // justifyContent='space-around'
            // alignItems='center' 
            sx={{width:{xs: '100%', sm:'80%', md:'50%'}, margin: '10% auto 2%'}}>              
                 {/* <Button
                    size='small'
                    variant='contained'
                    sx={{height: '1.5rem'}}
                    href='/new'>Add
                </Button> */}
                <TextField
                margin='normal'
                    hiddenLabel
                    variant='outlined'
                    size='small'
                    type="search"
                    id="search"
                    // label='Search hotels by location'
                    placeholder='Search hotels by location'
                    autoComplete='off'
                    value={search}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon/>
                            </InputAdornment>)
                        
                    }}
                    sx={{
                        marginTop:'1.2rem',
                        backgroundColor:'white',
                        borderRadius:'30px',
                        boxShadow: '0 1px 6px 0 rgba(32, 33, 36, .28)',
                        position: 'relative',
                        
                        
                            '& label': { paddingLeft: (theme) => theme.spacing(2)},
                            '& input': { paddingLeft: (theme) => theme.spacing(2), fontSize:'inherit'},
                            '& fieldset': {
                              paddingLeft: (theme) => theme.spacing(2.5),
                              borderRadius: '30px', border:'none'
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                          borderColor: "#80CBC4",
                          borderWidth: "2px",
                                }
                              }
                }}
                />
                {/* <Button 
                onClick={searchHotels}
                size='small'
                variant='contained'
                sx={{height: '1.5rem'}}>Search
                </Button> */}
            </Stack>
            // </Box> 


    )
}

export default SearchHotels;