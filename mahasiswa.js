const { rejects } = require('assert');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const { resolve } = require('path');

const pathDir='./data'
const pathData='./data/mahasiswa.json'

if (!fs.existsSync(pathDir)){
    fs.mkdirSync(pathDir)
}

if (!fs.existsSync(pathData)){
    fs.writeFileSync(pathData, '[]', 'utf8')
}

const muatData=()=>{
    const file = fs.readFileSync('data/mahasiswa.json', 'utf8')
    const dataJsonMhs = JSON.parse(file)
    return dataJsonMhs
}

const addData=(nama, nim, email, noHP, prodi)=>{
    const mahasiswa = {nama, nim, email, noHP, prodi}
    
    const dataJsonMhs = muatData()

    const duplikat=dataJsonMhs.find((mahasiswa)=>mahasiswa.nim === nim)
    if(duplikat){
        console.log(chalk.red(`Data NIM anda: ${nim} sudah ada atau sudah terdaftar dengan nama lain di dalam data!`))
        return false
    }
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red('Email tidak valid!'))
            return false
        }
    }
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red('Nomor Handphone tidak valid!'))
        return false
    }
    
    dataJsonMhs.push(mahasiswa)

    fs.writeFileSync('data/mahasiswa.json', JSON.stringify(dataJsonMhs))
    
    console.log(`Data dengan Nama ${(chalk.green(nama))}, NIM ${(chalk.green(nim))}, Email ${(chalk.green(email))}, Nomor HP ${(chalk.green(noHP))} dan dengan Prodi ${(chalk.green(prodi))} telah ditambahkan ke data.`)
}

const listData = () =>{
    const dataJsonMhs = muatData()

    console.log(chalk.bold.black.bgGreenBright('\t\t\t-== Daftar data Mahasiswa ==-'))
    console.log('')
    console.log(chalk.bold.bgGray('No.\tNama\tNIM\t\teMail\t\t\tNo. HP\t\tProdi'))

    dataJsonMhs.forEach((mahasiswa, i) => {
    console.log(chalk.cyanBright(`${i+1}.\t${mahasiswa.nama}\t${mahasiswa.nim}\t${mahasiswa.email}\t\t${mahasiswa.noHP}\t${mahasiswa.prodi}`))
    });
}

const findData=(nim)=>{
    const dataJsonMhs = muatData()

    const mahasiswa = dataJsonMhs.find((mahasiswa) => mahasiswa.nim === nim)
    if (!mahasiswa){
        console.log(chalk.red(`NIM yang anda masukkan ${(chalk.green(nim))}, tidak terkait dengan Mahasiswa yang ada di dalam data!`))
        return false
    }

    console.log(`Data dengan NIM ${(chalk.green(nim))} ditemukan:\n`)
    console.log(chalk.cyan(`Nama\t: ${mahasiswa.nama}`))
    console.log(chalk.cyan(`NIM\t: ${mahasiswa.nim}`))
    if(mahasiswa.email){
        console.log(chalk.cyan(`eMail\t: ${mahasiswa.email}`))
    }
    console.log(chalk.cyan(`No. HP\t: ${mahasiswa.noHP}`))
    console.log(chalk.cyan(`Prodi\t: ${mahasiswa.prodi}`))
}

const removeData=(nim)=>{
    const dataJsonMhs = muatData()

    const newMahasiswa = dataJsonMhs.filter((mahasiswa) => mahasiswa.nim !== nim)

    if(dataJsonMhs.length === newMahasiswa.length){
        console.log(chalk.red(`Data NIM ${(chalk.green(nim))} tidak dapat dihapus karena tidak terdaftar dalam data!`))
        return false
    }

    fs.writeFileSync('data/mahasiswa.json', JSON.stringify(newMahasiswa))
    console.log(`Data dengan NIM ${(chalk.green(nim))} berhasil dihapus`)
}

module.exports={addData, listData, findData, removeData}