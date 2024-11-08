import React, { useEffect, useState } from 'react';
import { useLogIn } from '../../context/LogInContext';
import Header from '../../components/header/Index';

import { Button2, Container, FoodItem, FoodList, FoodTypeContainer, InfoContainer, Input, SearchContainer, Title } from './styles';
import Button from '../../components/button/Index';
import Popup from "../../components/popup/Index";
import { useAlimentos } from '../../context/AlimentosContext';

type ContagemAlimentos = {
  produto_id: number;
  quantidade: number;
};

interface RefeicaoInterface{
  id: number,
  data: Date,
  tipo_refeicao: string,
  alimentos: ContagemAlimentos[]
}

const PesquisaAlimentos: React.FC = () => {
  
    const [search, setSearch] = useState('');
    const [alimentosExibidos, setAlimentosExibidos] = useState<any[]>([]);
    const [listaComidaSelecionada, setListaComidaSelecionada] = useState<any[]>([]);
    const [nutrientes, setNutrientes] = useState<any>(null);
    const [nomeRefeicao, setNomeRefeicao] = useState<string>("");

    const {userData} = useLogIn();
    const {pegarAlimentos, listaAlimentos, salvarRefeicao,statusEnvio} = useAlimentos()
    const {id,weight,email,gender,height,name} = userData;
    const {status} = statusEnvio;

   
    useEffect(()=>{
      pegarAlimentos();
      setAlimentosExibidos(listaAlimentos.slice(0,9));
    },[])



    // Atualiza a lista exibida conforme o usuário digita
    useEffect(() => {
      const alimentosFiltrados = listaAlimentos.filter((alimento) =>
          alimento.nome.toLowerCase().includes(search.toLowerCase())
      );
      setAlimentosExibidos(alimentosFiltrados.slice(0, 9)); // Mostra apenas 20 resultados
  }, [search, listaAlimentos]);

  useEffect(()=>{
    nutrientes;
  },[nutrientes])

  useEffect(()=>{
    listaComidaSelecionada;
  },[listaComidaSelecionada])

  useEffect(()=>{
    if(status === 'sucesso'){
      setListaComidaSelecionada([]);
      setNomeRefeicao("");
      setNutrientes(null);
    }
},[status])

  const handleAddFood = (food:any) => {
    
    setNutrientes(food.preparos[0].valorNutricional);
    setListaComidaSelecionada([...listaComidaSelecionada, food]);
  };

  const enviarRefeicao = () => {
    let quantidade:ContagemAlimentos[] = []
    listaComidaSelecionada.forEach((item) => {
      const alimentoExistente = quantidade.find((a) => a.produto_id === item.id);
      if(alimentoExistente){
        alimentoExistente.quantidade+=1;
      }else{
        quantidade.push({produto_id: item.id, quantidade:1})
      }
    })
   
    const pratoFeito:RefeicaoInterface = {
      id,
      tipo_refeicao: nomeRefeicao,
      alimentos: quantidade,
      data: new Date()
    }
    salvarRefeicao(pratoFeito);
    if(status === 'sucesso'){
      setListaComidaSelecionada([]);
      setNomeRefeicao("");
      setNutrientes(null);
    }
  };
        
  return (
    <>
        <Header email={email} gender={gender} height={height} name={name} weight={weight}/>
        <Container>
            <SearchContainer>
            <Title>Pesquisa de alimentos</Title>
            <Input
                placeholder="Pesquise os alimentos ingeridos"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FoodList>
                {alimentosExibidos
                .filter((alimento) => alimento.nome.toLowerCase().includes(search.toLowerCase()))
                .map((alimento, index) => (
                    <FoodItem key={index}>
                      <span>{alimento.nome}</span>
                    
                      <Button2 onClick={() => handleAddFood(alimento)}>+</Button2>
                    
                    </FoodItem>
                ))}
            </FoodList>
            <div style={{margin: '20px', display: 'flex', width: '40%', justifyContent: 'center'}}>
              <Button
                    color='#F97F33'
                      fontColor='#FFF'
                      label='ENVIAR'
                      onClick={()=>enviarRefeicao()}
                      style={{width: '20%', padding: '20px', fontWeight: "bold"}}
                  />
              </div>
            </SearchContainer>

            <InfoContainer>
              <FoodTypeContainer>
                <p>Nome da Refeiçao</p>
                <div style={{display: 'flex'}}>
                  <Input
                    placeholder="Nome da refeição"
                    value={nomeRefeicao}
                    onChange={(e) => setNomeRefeicao(e.target.value)}
                  />
                  
                </div>  
              </FoodTypeContainer>

              <div style={{display: 'flex', flexDirection:'column', backgroundColor: "#068713", margin: '20px', padding: '10px', borderRadius: '10px'}}>
                <p style={{textAlign: 'center', marginBottom: '5px'}}>Alimentos Selecionados</p>
                <div style={{display: 'flex', flexWrap: 'wrap-reverse', gap: '5px'}}>
                  {listaComidaSelecionada.length ? 
                    listaComidaSelecionada.map((comida, index)=>(
                      <>
                        <div key={index}>
                          <p style={{backgroundColor: '#a5d6a7', borderRadius: '20px', padding: '10px', margin: '5px', fontSize: '15px'}}>{comida.nome}</p> 
                        </div>
                      </>
                    )) :
                    <p>Seu prato esta vazio</p>
                  }
                </div>
              </div>

              {nutrientes &&
                <div style={{display: 'flex', flexDirection:'column', backgroundColor: "#068713", margin: '20px', padding: '10px', borderRadius: '10px'}}>
                  <div style={{marginBottom: '5px'}}>
                    <p>Total nutrientes por alimento</p>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Açucar Total</p>
                    <div style={{width: '40%',background: '#ecf1ed', padding: '10px', borderRadius: '10px', margin:'5px', textAlign: 'center'}}>{nutrientes.acucarTotal}</div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Calorias</p>
                    <div style={{width: '40%',background: '#ecf1ed', padding: '10px', borderRadius: '10px', margin:'5px', textAlign: 'center'}}>{nutrientes.caloria}</div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Carboidratos</p>
                    <div style={{width: '40%',background: '#ecf1ed', padding: '10px', borderRadius: '10px', margin:'5px', textAlign: 'center'}}>{nutrientes.carboidrato}</div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Colesterol</p>
                    <div style={{width: '40%',background: '#ecf1ed', padding: '10px', borderRadius: '10px', margin:'5px', textAlign: 'center'}}>{nutrientes.colesterol}</div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Lipidios</p>
                    <div style={{background: '#ecf1ed', padding: '10px', borderRadius: '10px', margin:'5px', textAlign: 'center'}}>{nutrientes.lipidios}</div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Proteina</p>
                    <div style={{width: '40%', background: '#ecf1ed', padding: '10px', borderRadius: '10px', margin:'5px', textAlign: 'center'}}>{nutrientes.proteina}</div>
                  </div>                  
                </div>
              }

            </InfoContainer>
            {status === "sucesso" ? (
              <Popup message="Refeição salva." type="success" />
            ) : status === "falha" ? (
                <Popup message="Erro ao salvar." type="error" />
              ) : (
                <></>
            )}
            
        </Container>
    </>
  );
}

export default PesquisaAlimentos;