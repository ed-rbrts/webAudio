class AudioProcessor extends AudioWorkletProcessor {
    process (inputs, outputs, parameters) {
      // take the first output
      const output = outputs[0]
      // fill each channel with random values multiplied by gain
      output.forEach((channel) => {
        for (let i = 0; i < channel.length; i++) {
          // generate random value for each sample
          // Math.random range is [0; 1); we need [-1; 1]
          // this won't include exact 1 but is fine for now for simplicity
          channel[i] = (Math.random() * 2 - 1);
            
           
        }
      })
      // as this is a source node which generates its own output,
      // we return true so it won't accidentally get garbage-collected
      // if we don't have any references to it in the main thread
      return true
    }
    
  }
  registerProcessor('audio-processor', AudioProcessor)