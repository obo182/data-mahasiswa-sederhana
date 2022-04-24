const yargs = require('yargs');
const mahasiswa = require('./mahasiswa');

//add
yargs.command({
    command: 'add',
    describe: 'Untuk menambah data',
    builder:{
        nama:{
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        nim:{
            describe: 'Nomor Induk Mahasiswa',
            demandOption: true,
            type: 'string'
        },
        email:{
            describe: 'Data Email',
            demandOption: false,
            type: 'string'
        },
        noHP:{
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        },
        prodi:{
            describe: 'Program Studi',
            demandOption: true,
            type: 'string'
        },
    },
    
    handler(argv){
        mahasiswa.addData(argv.nama, argv.nim, argv.email, argv.noHP, argv.prodi)
    },
})

//list
yargs.command({
    command: 'list',
    describe: 'Untuk menampilkan semua data',
    handler(){
        mahasiswa.listData()
    }
})

//find
yargs.command({
    command: 'find',
    describe: 'Untuk mencari data berdasarkan NIM Mahasiswa',
    builder:{
        nim:{
            describe: 'NIM Mahasiswa yang mau dicari',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        mahasiswa.findData(argv.nim)
    },
})

yargs.command({
    command: 'remove',
    describe: 'Untuk menghapus data',
    builder:{
        nim:{
            describe: 'NIM Mahasiswa yang mau dihapus',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        mahasiswa.removeData(argv.nim)
    }
})

.demandCommand()

yargs.parse()