import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo.svg'
import HeroesImg from '../../assets/heroes.png'

export default function NewIncident(){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId = localStorage.getItem('ongId')

    const history = useHistory()

    async function handleNewIncident(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId
                }
            })

            history.push('/profile')

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }

    return(
        <div className="new-incident-container">

        <div className="content">
            <section>
                <img src={LogoImg} alt="Logo Be the hero"/>

                <h1> Cadastrar novo caso </h1>
                <p>Descreva o caso detalhadamente para encontrar um herói que resolva isso.</p>

                <Link className="back-link"   to="/profile"> 
                    <FiArrowLeft  size={16} color="#E02041" />
                    Voltar para perfil
                </Link>

            </section>
            <form action="" onSubmit={handleNewIncident}>
                <input 
                    placeholder="Titulo do caso" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    placeholder="Valor em reais" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                
                <button className="button" type="submit"  >Cadastrar</button>
            </form>
        </div>

    </div>
    )
}