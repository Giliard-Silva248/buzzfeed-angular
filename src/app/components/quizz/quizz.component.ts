import { Component, OnInit } from '@angular/core';
import  quizz_questions  from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{
    ngOnInit(): void {
        if(quizz_questions){
            this.finished = false
            this.title = quizz_questions.title

            this.questions = quizz_questions.questions
            this.questionSelected = this.questions[this.questionIndex]

            this.questionIndex = 0
            this.quetionMaxIndex = this.questions.length

            console.log(this.questionIndex);
            console.log(this.quetionMaxIndex);

        }
    }

    playerChoose(value:string){
        this.answers.push(value)
        this.nextStep()

    }

    async nextStep(){
        this.questionIndex++

        if(this.quetionMaxIndex > this.questionIndex){
            this.questionSelected = this.questions[this.questionIndex]
        }else{
            const finalAnswer:string = await this.checkResult(this.answers)
            this.finished = true
            this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
        }
    }

    async checkResult(answers:string[]){
        const res = answers.reduce((previous, current, i, arr)=>{

            if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length  ) {

                return previous

            }else{

                return current

            }
        })
        return res
    }


    title:string = ""

    questions:any
    questionSelected:any

    answers:string[] = []
    answersSelected:string = ""

    questionIndex:number = 0
    quetionMaxIndex:number = 0

    finished:boolean = false
}
