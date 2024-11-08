import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface ALimentosProviderProps{
    children: ReactNode
}

interface PreparoInterface{
    "tipo": string,
	"valorNutricional": {
		"proteina": number,
		"carboidrato": number,
		"colesterol": number,
		"lipidios": number,
		"acucarTotal": number,
		"caloria": number
	}
}

type ContagemAlimentos = {
    produto_id: number;
    quantidade: number;
  };

interface RefeicaoInterface{
    id: number,
    data: Date,
    tipo_refeicao: string,
    alimentos:ContagemAlimentos[]
}

interface AlimentoInterface{
    "id": number,
	"nome": string,
	"grupo": string,
	"preparos": PreparoInterface[]
}

interface IAlimentosContextData{
    listaAlimentos: AlimentoInterface[]
    pegarAlimentos: ()=>void;
    salvarRefeicao: (refeicao:RefeicaoInterface)=>void
    statusEnvio: StatusInterface
}

interface StatusInterface{
    status: "sucesso" | "falha" | null
}


const AlimentosContext = createContext({} as IAlimentosContextData);

function AlimentosProvider({children}:ALimentosProviderProps){
    const [listaAlimentos, setListaAlimentos] = useState<AlimentoInterface[]>([])
    const [statusEnvio, setStatusEnvio] = useState<StatusInterface>({} as StatusInterface);
    async function pegarAlimentos(){
        try {
            const response = await axios.get('http://localhost:3000/api/produtos/listar');
            setListaAlimentos(response.data);
            
        } catch (error:any) {
            console.log('ERROR: ', error.response.data)
            setStatusEnvio({status: "falha"})
        }
    }

    async function salvarRefeicao({alimentos,data,id,tipo_refeicao}: RefeicaoInterface){
        setStatusEnvio({status: null})
        try {
            const response = await axios.post('http://localhost:3000/api/refeicoes/adicionarrefeicao',{
                usuario_id: id,
                data,
                tipo_refeicao,
                alimentos
            })
            console.log(response.status)
            setStatusEnvio({status: "sucesso"});

        } catch (error: any) {
            console.log('ERROR: ', error)
            setStatusEnvio({status: "falha"});
        }
    }

    return(
        <AlimentosContext.Provider value={{pegarAlimentos, listaAlimentos, salvarRefeicao, statusEnvio}}>
            {children}
        </AlimentosContext.Provider>
    );
}

function useAlimentos(){
    const context = useContext(AlimentosContext);
    return context
}

export {useAlimentos,AlimentosProvider }

