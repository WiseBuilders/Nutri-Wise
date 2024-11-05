import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react"

interface PesoProviderProps{
    children: ReactNode
}

interface PesoInfoInterface{
    usuario_id: number,
    peso: string;
    metaAlcancar: string
}

interface IPesoHistoricoContextData{
    pesoHistorico: PesoInfoInterface[];
    //getPesoHistorico: () => void;
    postPeso: ({peso,metaAlcancar}: PesoInfoInterface) => void
    PegarHistorico: (usuario_id: number) => void;
}

const PesoContext = createContext({} as IPesoHistoricoContextData);


function PesoProvider({children}: PesoProviderProps){
    const [pesoHistorico, setPesoHistorico] = useState<PesoInfoInterface[]>([{} as PesoInfoInterface])

    async function postPeso({usuario_id, peso, metaAlcancar}:PesoInfoInterface ){
        try {
            const pesoFormatado = parseFloat(peso);
            const metaAlcacarFormatado = parseFloat(metaAlcancar);
            
            await axios.post("http://localhost:3000/api/historicoPeso/criar", {
                usuario_id,
                peso: pesoFormatado,
                metaAlcancar: metaAlcacarFormatado
            });

            await PegarHistorico(usuario_id)

        } catch (error:any) {
            console.log('ERROR: ', error.response.data);
        }
    }

    async function PegarHistorico(usuario_id: number){
        
        try{
            const response = await axios.get(`http://localhost:3000/api/historicoPeso/listar/${usuario_id}`)
            setPesoHistorico(response.data);
        }catch(error:any){
            console.log('ERROR: ', error.response.data)
        }
    } 

    return(
        <PesoContext.Provider value={{pesoHistorico,postPeso, PegarHistorico}}>
            {children}
        </PesoContext.Provider>
    )
}

function usePeso(){
    const context = useContext(PesoContext);
    return context
}

export { PesoProvider, usePeso};