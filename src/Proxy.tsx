import * as React from 'react';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// seçilen satırın arkaplanını boyamak
const CustomDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-row.selectedRow': {
        backgroundColor: 'rgb(29, 82, 145) !important',
        color: 'white',
    },
});

// veriler
const data = [
    { id: '81FD5289-7821-23B8-FA3C-C04AA363AD01', registry: '002', name: 'Yusuf Ali Selek', email: 'yusuf@hotmail.com' },
    { id: 'D0D0CB6D-B4EE-3526-2271-18CE06E45DC2', registry: '001', name: 'Kayra Özgür', email: 'kayra.ozgur41@hotmail.com' },
];

// kolon başlıkları
const columns = [
    { field: 'registry', headerName: 'Sicil No', flex: 1 },
    { field: 'name', headerName: 'Ad Soyad', flex: 1 },
    { field: 'email', headerName: 'E-Posta', flex: 2 },
];

// modalın stillemesi
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'rgb(253,253,253)',
    borderRadius: '15px',
    boxShadow: 24,
    p: 2.5,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false); //modal kontrolü
    const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]); //seçilen satırın id'si almak
    const [choosedId, setChoosedId] = React.useState<string | null>(null); //seçildikten sonra, seç butonuna basılınca id'nin boş olup olmamasını kontrol eder


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('proxy_acc')
        localStorage.removeItem('royal_acc')
    }

    const handleRowClick = (params: GridRowParams) => {
        const selectedId = params.id as string;
        setChoosedId(selectedId);
        setSelectedRowIds([selectedId]);
        localStorage.setItem('proxy_acc', selectedId);
        localStorage.setItem('royal_acc', selectedId);

    };

    // id boşsa uyarı ver, değilse işleme devam et
    const choseUser = () => {
        if (choosedId === null) {
            alert('Lütfen bir kullanıcı seçin !');
        } else {
            // Kullanıcı seçilmişse yapılacak işlemler
        }
    };


    const rowHeight = 52; // Varsayılan satır yüksekliği
    const headerHeight = 56; // Header'ın yüksekliği
    const gridHeight = rowHeight * 4 + headerHeight + 1.6; // 4 satır + header yüksekliği + 1px ekle

    return (
        <div>
            <Button onClick={handleOpen} variant='contained'>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container>
                        {/* Personel seç başlığı */}
                        <Grid size={12} container justifyContent='flex-start' alignItems='center'>
                            <Typography variant='h6' component='span' fontWeight='bold'>Personel Seç</Typography>
                        </Grid>
                        {/* başlık ile grid arasındaki divider */}
                        <Grid size={12} mb={2} mt={1}>
                            <Divider sx={{ background: 'rgb(245,245,245)' }} />
                        </Grid>
                        {/* datagrid */}
                        <Grid size={12}>
                            <div style={{ width: '100%' }}>
                                <div style={{ height: gridHeight, width: '100%' }}> {/* Yükseklik burada ayarlandı */}
                                    <CustomDataGrid
                                        sx={{
                                            '& .MuiDataGrid-cell:focus': {
                                                outline: 'unset'
                                            },
                                            '& .MuiDataGrid-filler': {
                                                display: 'none'
                                            },
                                            '& .MuiDataGrid-row:last-of-type': {
                                                borderBottom: '1px solid rgb(224,224,224)'
                                            },
                                        }}
                                        rows={data}
                                        columns={columns}
                                        rowHeight={rowHeight} // Satır yüksekliğini ayarla
                                        initialState={{
                                            pagination: {
                                                paginationModel: { pageSize: data.length },
                                            },
                                        }}
                                        pageSizeOptions={[data.length]}
                                        paginationMode="client"
                                        hideFooter
                                        disableColumnMenu
                                        onRowClick={handleRowClick}
                                        getRowClassName={(params) =>
                                            selectedRowIds.includes(params.id as string) ? 'selectedRow' : ''
                                        }
                                    />
                                </div>
                            </div>
                        </Grid>
                        {/* butonlar */}
                        <Grid size={12} mt={2} container justifyContent="flex-start"
                            sx={{
                                '& .MuiButtonBase-root': {
                                    borderRadius: '50px',
                                    width: '96px',
                                    textTransform: 'none'
                                },
                                '& .MuiButtonBase-root:nth-of-type(1)': {
                                    bgcolor: 'rgb(29, 82, 145)'
                                },
                                '& .MuiButtonBase-root:nth-of-type(2)': {
                                    bgcolor: 'rgb(255, 255, 255)',
                                    color: 'black'
                                },


                            }}
                        >
                            <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => choseUser()}>Seç</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleClose()}>İptal</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
