const app = Vue.createApp({
    data() {
        return {
            msg: '',
            notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
            noteArray: [],
            noteOutput:  [],
            rotation: 0,
            hover: false,
            mainDiv: "mainD",           
            
        }
    },
    methods: {
        trigger() {
            this.rotation = ((this.rotation + 1)%28)
            this.noteArray = [1, 1, 1, 1]
            this.noteOutput = ""
            this.noteArray = this.noteArray.map((i, ind, lst) => lst[ind] = ind)
            this.noteArray = this.noteArray.map((i, ind, lst) => lst[ind] = Math.round(((i + (this.rotation/7.))/4.) * 7.))
            this.noteArray = this.noteArray.map((i, ind, lst) => lst[ind] = Math.round((i/7.) * 12.))
            this.noteArray = this.noteArray.map((i, ind, lst) => lst[ind] = i%12)
            this.noteOutput = this.noteArray.map((i) => this.notes[i])
            
        },
        
    }
})
app.mount('#app')