import { OpenAI } from "langchain/llms";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { Notice } from 'obsidian';
const template = "What is a good name for a company that makes {question}?";
export default class LangChain{
    private model: OpenAI
    constructor(){
        // this.model = new OpenAI({openAIApiKey:apiKey, temperature: 0.9 });
    }

    async callChain(apiKey:string,question: string){
        this.model = new OpenAI({openAIApiKey:apiKey, temperature: 0.9 });
        const prompt = new PromptTemplate({
            template: template,
            inputVariables: [question],
          });
        const chain = new LLMChain({ llm: this.model, prompt: prompt });
        const res = await chain.call({ question: question });
        console.log(`question is:${question} ans is ${res}`);
        new Notice(`${res}`);
    }
}