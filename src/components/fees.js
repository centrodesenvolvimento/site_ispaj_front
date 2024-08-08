import { useState } from 'react';
import '../css/about.css'
import '../css/fees.css'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../@/components/ui/table"

const Fees = () =>  {
    const [emolu, setEmolu] = useState({
        title: 'Emolumentos',
        list: [
            {
              title: 'Insrição ao Exame de Acesso',
              valor: '4.375,00',
              obs: 'a',
              numero: 1
            },
            {
                title: 'Curso Preparatório para Exames de Acesso',
                valor: '6.250,00',
                obs: 'a',
                numero: 2

              },
        ]
    })
    const [matricula, setMatricula] = useState({
        title: 'Matrícula',
        list: [
            {
              title: 'Cursos de Ciências Sociais e Económimcos',
              valor: '17.500,00',
              obs: 'b',
              numero: 3

            },
            {
                title: 'Cursos de Ciências Exactas e Engenharias',
                valor: '18.750,00',
                obs: 'b',
                numero: 4

              },
              {
                title: 'Cursos de Ciências de Saúde',
                valor: '20.625,00',
                obs: 'b',
                numero: 5

              },
        ]
    })
    const [confirmacao, setConfirmacao] = useState({
        title: 'Confirmação',
        list: [
            {
              title: 'Cursos de Ciências Sociais e Económimcos',
              valor: '17.500,00',
              obs: 'b',
              numero: 6

            },
            {
                title: 'Cursos de Ciências Exactas e Engenharias',
                valor: '18.750,00',
                obs: 'b',
                numero: 7

              },
              {
                title: 'Cursos de Ciências de Saúde',
                valor: '20.625,00',
                obs: 'b',
                numero: 8

              },
              {
                title: 'Activação de Matrícula',
                valor: '6.250,00',
                obs: 'a',
                numero: 9
              },
              {
                  title: 'Anulação de Matrícula',
                  valor: '12.500,00',
                  obs: 'a',
                  numero: 10

                },
                {
                  title: 'Cartão de Estudante',
                  valor: '4.500,00',
                  obs: 'c',
                  numero: 11
                },
                {
                    title: '2ª Via do Cartão de Estudante',
                    valor: '5.000,00',
                    obs: 'c',
                    numero: 12
                  },
                  {
                    title: 'Declaração com Notas',
                    valor: '10.000,00',
                    obs: 'c',
                    numero: 13

                  },
                  {
                      title: 'Declaração Simples',
                      valor: '5.000,00',
                      obs: 'c',
                      numero: 14
                    },
                    {
                      title: 'Disciplinas em Atraso',
                      valor: '4.000,00',
                      obs: 'c',
                      numero: 15

                    },
                    {
                        title: 'Exame Especial',
                        valor: '7.500,00',
                        obs: 'a',
                        numero: 16

                      },
                      {
                        title: 'Revisão de Prova',
                        valor: '12.500,00',
                        obs: 'a',
                        numero: 17

                      },
                      {
                          title: 'Mudança de Curso',
                          valor: '10.000,00',
                          obs: 'c',
                          numero: 18

                        },
                        {
                          title: 'Mudança de Turno',
                          valor: '5.000,00',
                          obs: 'c',
                          numero: 19

                        },
                        {
                            title: 'Transferências de IES',
                            valor: '18.750,00',
                            obs: 'a',
                            numero: 20

                          },
                          {
                            title: 'Trabalho de Fim de Curso (Monografia, Beca, Certificado e Diploma)',
                            valor: '312.500,00',
                            obs: 'a',
                            numero: 20

                          },
                          {
                              title: 'Inscrição à Defesa',
                              valor: '31.250,00',
                              obs: 'a',
                              numero: 21

                            },
                            {
                              title: '2ª Via de recibos de pagamentos',
                              valor: '500,00',
                              obs: 'c',
                              numero: 22

                            },
        ]
    })

    const [propinas, setPropinas] = useState({
        title: 'Propinas - Mensalidades',
        list: [
            {
              title: 'Cursos da àrea de Ciências Sociais e Económimcos',
              valor: '35.000,00',
              obs: 'a',
              numero: 23
            },
            {
                title: 'Cursos da àrea de Ciências Exactas e Engenharias',
                valor: '37.500,00',
                obs: 'a',
                numero: 24

              },
              {
                title: 'Cursos da àrea de Ciências de Saúde',
                valor: '41.250,00',
                obs: 'a',
                numero: 25

              },
        ]
    })
    
    return (
        // n.º
        <div className='sectionContainer'>
        <div className='container'>
            <div className='info' style={{height: '100%'}}>
                <div className='preTitle'>Emolumentos e Propinas</div>
                <div className='title'></div>
            </div>

            {/*  */}
        </div>
        <div className='container1'>
            <div className='feesContainer'>
            <Table>
            <TableCaption>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 20, padding: 15, fontWeight: '600', color: 'black', gap: 10}}>
                    <div className='feeObs'>a) Aplicação da alínea b) do nº.1 do Art. 2º do Decreto Executivo Conjunto nº 420/21 de 7 de Dezembo</div>
                    <div className='feeObs'>b) Valor correspondente a 50% do valor de mensalidade (propina)</div>
                    <div className='feeObs'>c) Taxa determinada</div>
                </div></TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nº</TableHead>
          <TableHead>Emolumentos</TableHead>
          <TableHead>Valor (Kz)</TableHead>
          <TableHead className="text-right">OBS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emolu.list.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.numero}</TableCell>
            <TableCell>{invoice.title}</TableCell>
            <TableCell>{invoice.valor}</TableCell>
            <TableCell className="text-right">{invoice.obs}</TableCell>
          </TableRow>
        ))}
        
        {/* {propinas.list.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.numero}</TableCell>
            <TableCell>{invoice.title}</TableCell>
            <TableCell>{invoice.valor}</TableCell>
            <TableCell className="text-right">{invoice.obs}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nº</TableHead>
          <TableHead>Confirmação</TableHead>
          <TableHead>Valor (Kz)</TableHead>
          <TableHead className="text-right">OBS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {confirmacao.list.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.numero}</TableCell>
            <TableCell>{invoice.title}</TableCell>
            <TableCell>{invoice.valor}</TableCell>
            <TableCell className="text-right">{invoice.obs}</TableCell>
          </TableRow>
        ))}
        
        {/* {propinas.list.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.numero}</TableCell>
            <TableCell>{invoice.title}</TableCell>
            <TableCell>{invoice.valor}</TableCell>
            <TableCell className="text-right">{invoice.obs}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nº</TableHead>
          <TableHead>Propinas - Mensalidades</TableHead>
          <TableHead>Valor (Kz)</TableHead>
          <TableHead className="text-right">OBS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {propinas.list.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.numero}</TableCell>
            <TableCell>{invoice.title}</TableCell>
            <TableCell>{invoice.valor}</TableCell>
            <TableCell className="text-right">{invoice.obs}</TableCell>
          </TableRow>
        ))}
        
        {/* {propinas.list.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.numero}</TableCell>
            <TableCell>{invoice.title}</TableCell>
            <TableCell>{invoice.valor}</TableCell>
            <TableCell className="text-right">{invoice.obs}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
    
    
            </div>
        </div>
        </div>
    )
}
export default Fees