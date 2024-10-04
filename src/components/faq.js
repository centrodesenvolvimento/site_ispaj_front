import '../css/faq.css'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../@/components/ui/accordion"
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
const Faq = ({admissionsContents}) => {
const [faqs, setFaqs] = useState([
        {
            question: "Qual é o endereço da Universidade ISPaj?",
            answer: "A Universidade ISPaj está localizada em Nova Vida, Luanda, Angola."
        },
        {
            question: "Quais cursos de graduação são oferecidos na Universidade ISPaj?",
            answer: "A Universidade ISPaj oferece cursos em Engenharia, Medicina, Direito, Economia, Ciências da Computação, entre outros."
        },
        {
            question: "Qual é o processo de admissão para novos alunos?",
            answer: "Os candidatos devem preencher um formulário de inscrição, enviar a documentação necessária e passar por um exame de admissão."
        },
        {
            question: "Qual é a duração dos cursos de graduação?",
            answer: "A duração dos cursos de graduação varia de 3 a 5 anos, dependendo do curso."
        },
        {
            question: "A universidade oferece programas de pós-graduação?",
            answer: "Sim, a Universidade ISPaj oferece programas de mestrado e doutorado em diversas áreas."
        },
        {
            question: "Qual é a missão e visão da Universidade ISPaj?",
            answer: "A missão da Universidade ISPaj é fornecer uma educação de alta qualidade, promover a pesquisa inovadora e contribuir para o desenvolvimento da sociedade. Nossa visão é ser uma instituição líder em educação superior, reconhecida pela excelência acadêmica e impacto social."
        },
        {
            question: "Quais são os critérios para seleção de professores na Universidade ISPaj?",
            answer: "Os professores da Universidade ISPaj são selecionados com base em suas qualificações acadêmicas, experiência profissional, capacidade de pesquisa e ensino. Além disso, valorizamos a contribuição para a comunidade acadêmica e a capacidade de inovar na pedagogia."
        },
        {
            question: "A universidade oferece suporte para pesquisa e desenvolvimento?",
            answer: "Sim, a Universidade ISPaj possui centros de pesquisa dedicados, laboratórios bem equipados e oferece financiamento para projetos de pesquisa. Os alunos e professores são incentivados a participar de conferências e publicar suas descobertas."
        },
        {
            question: "Quais são os serviços de carreira oferecidos aos alunos?",
            answer: "A Universidade ISPaj tem um centro de carreira que oferece orientação profissional, workshops de desenvolvimento de habilidades, feiras de emprego e oportunidades de networking com empresas parceiras."
        },
        {
            question: "Como a universidade apoia a inovação e o empreendedorismo?",
            answer: "A universidade possui um centro de inovação e empreendedorismo que oferece recursos, mentorias e eventos para apoiar estudantes e professores na criação de startups e no desenvolvimento de novas ideias e tecnologias."
        },
        {
            question: "Quais são os serviços de saúde disponíveis no campus?",
            answer: "A Universidade ISPaj oferece uma clínica no campus que fornece serviços médicos básicos, aconselhamento psicológico e programas de bem-estar para todos os estudantes e funcionários."
        },
        {
            question: "A universidade oferece programas de desenvolvimento de liderança?",
            answer: "Sim, oferecemos programas de desenvolvimento de liderança que incluem workshops, seminários e oportunidades de liderança em clubes estudantis e organizações no campus."
        },
        {
            question: "Como a universidade promove a responsabilidade social?",
            answer: "A Universidade ISPaj promove a responsabilidade social através de iniciativas de serviço comunitário, projetos de sustentabilidade, e parcerias com organizações locais para enfrentar desafios sociais e ambientais."
        },
        {
            question: "Quais são as políticas de inclusão e diversidade da universidade?",
            answer: "A Universidade ISPaj está comprometida com a inclusão e a diversidade, promovendo um ambiente acolhedor para todos os estudantes, independentemente de sua origem, gênero, ou crenças. Temos políticas e programas específicos para apoiar grupos sub-representados."
        },
        {
            question: "Como a universidade se comunica com os alunos e a comunidade?",
            answer: "Utilizamos várias plataformas de comunicação, incluindo email, redes sociais, boletins informativos e o portal do estudante para manter todos informados sobre eventos, notícias e atualizações importantes."
        },
        {
            question: "Quais são os requisitos de graduação para os alunos?",
            answer: "Para se formar, os alunos devem completar todos os cursos obrigatórios e eletivos, atingir um mínimo de créditos, e, em alguns cursos, apresentar uma dissertação ou projeto final. A participação em estágios pode ser obrigatória dependendo do curso."
        },
        {
            question: "A universidade oferece programas de estudo no exterior?",
            answer: "Sim, a Universidade ISPaj tem parcerias com instituições em vários países e oferece programas de intercâmbio e estudo no exterior para proporcionar aos alunos uma experiência global."
        },
        {
            question: "Quais são as opções de alimentação no campus?",
            answer: "O campus oferece várias opções de alimentação, incluindo cantinas, cafeterias e quiosques que servem uma variedade de refeições saudáveis e acessíveis para atender às necessidades dos estudantes."
        },
        {
            question: "A universidade tem um programa de ex-alunos?",
            answer: "Sim, a Universidade ISPaj tem um ativo programa de ex-alunos que oferece networking, eventos, e oportunidades de desenvolvimento contínuo. Mantemos contato com nossos ex-alunos e celebramos suas conquistas."
        },
        {
            question: "Quais são as opções de financiamento disponíveis para os estudantes?",
            answer: "Além das bolsas de estudo, a Universidade ISPaj oferece opções de financiamento como empréstimos estudantis, planos de pagamento parcelado e programas de trabalho-estudo para ajudar os estudantes a financiar sua educação."
        },
        {
            question: "Como os alunos podem participar de atividades esportivas no campus?",
            answer: "Os alunos podem participar de várias atividades esportivas através dos clubes e equipes esportivas da universidade. Oferecemos instalações para futebol, basquete, vôlei, e outras modalidades, além de programas de fitness e bem-estar."
        },
        {
            question: "Quais são as políticas de segurança no campus?",
            answer: "A segurança dos estudantes e funcionários é uma prioridade na Universidade ISPaj. Temos um sistema de segurança 24 horas, incluindo guardas de segurança, câmeras de vigilância e procedimentos de emergência bem estabelecidos."
        },
        {
            question: "Quais são os requisitos para a inscrição em um curso de pós-graduação?",
            answer: "Os candidatos devem ter um diploma de graduação e, em alguns casos, experiência profissional na área de interesse."
        },
        {
            question: "Há bolsas de estudo disponíveis para os alunos?",
            answer: "Sim, a Universidade ISPaj oferece várias bolsas de estudo com base no mérito acadêmico e na necessidade financeira."
        },
        {
            question: "Qual é a taxa de matrícula na Universidade ISPaj?",
            answer: "As taxas de matrícula variam conforme o curso. É recomendável verificar no site da universidade ou no departamento de admissões."
        },
        {
            question: "Quais são os prazos de inscrição para novos alunos?",
            answer: "Os prazos de inscrição variam conforme o curso e o semestre. Consulte o calendário acadêmico da universidade para mais detalhes."
        },
        {
            question: "A universidade tem alojamentos para estudantes?",
            answer: "Sim, a Universidade ISPaj oferece alojamentos para estudantes no campus."
        },
        {
            question: "Como posso obter um certificado de conclusão do curso?",
            answer: "Os alunos podem solicitar o certificado de conclusão do curso na secretaria acadêmica após a conclusão de todos os requisitos do curso."
        },
        {
            question: "A universidade oferece programas de intercâmbio?",
            answer: "Sim, a Universidade ISPaj possui parcerias com várias universidades internacionais para programas de intercâmbio."
        },
        {
            question: "Quais são as instalações disponíveis no campus?",
            answer: "O campus oferece bibliotecas, laboratórios, centros de pesquisa, instalações esportivas, cantinas e muito mais."
        },
        {
            question: "A universidade tem programas de estágio para os alunos?",
            answer: "Sim, a universidade tem parcerias com várias empresas e instituições para fornecer oportunidades de estágio aos alunos."
        },
        {
            question: "Como posso acessar a biblioteca da universidade?",
            answer: "Os alunos podem acessar a biblioteca com sua carteirinha de estudante e utilizar os recursos disponíveis."
        },
        {
            question: "A universidade oferece cursos noturnos?",
            answer: "Sim, a Universidade ISPaj oferece cursos noturnos para alunos que trabalham durante o dia."
        },
        {
            question: "Qual é a política de transferência de créditos?",
            answer: "A política de transferência de créditos permite que os alunos transferem créditos de outras instituições, sujeita à avaliação da universidade."
        },
        {
            question: "Como posso contatar o departamento de admissões?",
            answer: "Você pode contatar o departamento de admissões pelo telefone, email ou visitando o escritório no campus."
        },
        {
            question: "Quais são os métodos de pagamento das mensalidades?",
            answer: "As mensalidades podem ser pagas via transferência bancária, cartão de crédito ou diretamente na tesouraria da universidade."
        },
        {
            question: "A universidade oferece suporte psicológico para os alunos?",
            answer: "Sim, a Universidade ISPaj oferece serviços de apoio psicológico e aconselhamento para todos os alunos."
        },
        {
            question: "Quais são as opções de transporte para o campus?",
            answer: "O campus é acessível por transporte público, e a universidade também oferece serviços de transporte para os alunos."
        },
        {
            question: "A universidade tem programas de apoio para estudantes internacionais?",
            answer: "Sim, a universidade oferece programas de orientação e apoio específicos para estudantes internacionais."
        },
        {
            question: "Como posso participar das atividades extracurriculares?",
            answer: "Os alunos podem se inscrever em várias atividades extracurriculares através dos clubes estudantis e organizações no campus."
        },
        {
            question: "A universidade oferece cursos de educação a distância?",
            answer: "Sim, a Universidade ISPaj oferece vários cursos online e programas de educação a distância."
        },
        {
            question: "Qual é o calendário acadêmico da universidade?",
            answer: "O calendário acadêmico, incluindo datas importantes e feriados, está disponível no site da universidade."
        }
    ]);
    useEffect(() => {
        //('adm', admissionsContents)
    }, [])
    return (
        <div className="sectionContainer">
            <div className='container'>
            <div className='info' style={{height: '100%'}}>
                <div className='preTitle' style={{color: 'black'}}>Perguntas Frequentes</div>
                <div className='preTitle' style={{fontWeight: '400', marginTop: 10, fontSize: 15}}>Obrigado pelo seu interesse no <span style={{fontWeight: '700', color: 'orange'}}>ISPAJ</span>! Esperamos ser o mais úteis possível, por isso recolhemos muitas "Perguntas Frequentes" (também conhecidas como "FAQs") juntamente com as respostas correspondentes para fornecer informações adicionais para ajudá-lo.</div>
            </div>

            {/*  */}
        </div>
        <div className='container1'>
            <div className='feesContainer'>
                <Accordion type='multiple' collapsible>
                    {admissionsContents?.perguntas && [...admissionsContents?.perguntas].length > 0 ? [...admissionsContents?.perguntas].filter((item) => {
               if (item.show == undefined){
                   return item
               }else if (item.show == true || item.show == 'true'){
                   return item
               }
           }).map((item, index) => {
                        return (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger style={{ fontSize: 14}}>{item.pergunta}</AccordionTrigger>
                                <AccordionContent>
                                    <div dangerouslySetInnerHTML={{__html: item.resposta}}></div>
                               </AccordionContent>
                            </AccordionItem>
                        )
                    }) :
                    faqs.slice(0, 15).map((item, index) => {
                        return (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <Skeleton />
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </div>
        </div>
        </div>
    )
}
export default Faq