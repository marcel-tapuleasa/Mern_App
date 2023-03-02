import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { UserContext } from '../../context/UserContext';



//    function useQuery() {
//     return new URLSearchParams(useLocation().search);
//   }


function SearchHotels (props) {

 
    const [search, setSearch] = useState('');
    const [userContext, setUserContext] = useContext(UserContext);

    const {toggleSearchDone} = props;

    // const query = useQuery();
    // const searchQuery = query.get('searchQuery');
    const navigate = useNavigate();

    const searchHotels = async (searchQuery) => {
        toggleSearchDone();
        if(search.trim()) {
        const res = await axios.get(`https://hoteltips.onrender.com/hotels/search?searchQuery=${search || 'none'}`);
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
        <Stack 
            sx={{width:{xs: '100%', sm:'80%', md:'50%'}, margin: '10% auto 2%'}}>             
                <TextField
                margin='normal'
                    hiddenLabel
                    variant='outlined'
                    size='small'
                    type="search"
                    id="search"
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

            </Stack>


    )
}

export default SearchHotels;