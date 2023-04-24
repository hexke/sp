import { Box, Checkbox, Container, FormControl, FormControlLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import './App.css'
import { ChangeEvent } from 'react';
import { serviceTariff } from './utils/tariff';
import useTariff from './hooks/useTariff';

function App() {
    const [changeTariffYear, changeOption, currentTariff, availableOptions, availableYears, total] = useTariff();

    const onYearChange = (e: SelectChangeEvent<string>) => {
        if (!e.target || !e.target.value || e.target.value === currentTariff.year) {
            return;
        }
        changeTariffYear(e.target.value);
    }

    const onServiceChange = (e: ChangeEvent<HTMLInputElement>, service: string) => {
        changeOption(e.target.checked, service);
    }

    return (
        <div className="App">
            <header>
                <Container sx={{ p: '1rem 0' }}>
                    <Typography variant='h4' align='center'>Kalkulator Cen</Typography>
                </Container>
            </header>
            <main>
                <Container sx={{ margin: 'auto', width: 'max-content' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography>Rok rozliczeniowy:</Typography>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                            <Select value={currentTariff.year} displayEmpty inputProps={{ 'aria-label': 'Without label' }} onChange={onYearChange}>
                                {availableYears.map(year => <MenuItem value={year} key={year}>{year}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Usługa</TableCell>
                                <TableCell>cena&nbsp;(zł)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <FormControlLabel control={<Checkbox onChange={(e) => onServiceChange(e, 'internet')} />} label='Internet' />
                                </TableCell>
                                <TableCell align='center'>
                                    {currentTariff.internet}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <FormControlLabel control={<Checkbox onChange={(e) => onServiceChange(e, 'television')} />} label='telewizja' />
                                </TableCell>
                                <TableCell align='center'>
                                    {currentTariff.television}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <FormControlLabel control={<Checkbox onChange={(e) => onServiceChange(e, 'phone')} />} label='abonament telefoniczny' />
                                </TableCell>
                                <TableCell align='center'>
                                    {currentTariff.phone}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <FormControlLabel control={<Checkbox onChange={(e) => onServiceChange(e, 'decoder')} disabled={!availableOptions.television} />} label='dekoder 4K' />
                                </TableCell>
                                <TableCell align='center'>
                                    {currentTariff.decoder}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter sx={{ fontSize: '24px' }}>
                            <TableRow>
                                <TableCell align='right'>Łącznie:</TableCell>
                                <TableCell align='center'>{total ? total : '-'}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Container>
            </main>
        </div>
    );
}

export default App;
