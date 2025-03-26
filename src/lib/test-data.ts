// This file contains the test data from the provided JSON

export const testData = {
    message: "Data retrieved successfully",
    data: {
      _id: "67e2da30b7f8dcc671243de0",
      userId: "67e185076b4b158e76e6818c",
      userName: "suraj.gupta",
      subject: [
        {
          id: "1",
          title: "Jee Main Mock Test",
          marks: 300,
          duration: 180,
          subject: ["physics", "chemistry", "mathematics"],
        },
      ],
      answersData: [
        {
          physics: {
            "1": {
              text: "A car accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. What is its acceleration?",
              options: [
                {
                  id: "a",
                  value: "2",
                  label: "2 m/s²",
                },
                {
                  id: "b",
                  value: "4",
                  label: "4 m/s²",
                },
                {
                  id: "c",
                  value: "5",
                  label: "5 m/s²",
                },
                {
                  id: "d",
                  value: "10",
                  label: "10 m/s²",
                },
              ],
              correctAnswer: "b",
              selectedValue: "2",
              status: false,
            },
            "2": {
              text: "An object is thrown vertically upwards with an initial velocity of 10 m/s. What is its velocity after 2 seconds, assuming the acceleration due to gravity is 10 m/s²?",
              options: [
                {
                  id: "a",
                  value: "0",
                  label: "0 m/s",
                },
                {
                  id: "b",
                  value: "10",
                  label: "10 m/s",
                },
                {
                  id: "c",
                  value: "0",
                  label: "0 m/s",
                },
                {
                  id: "d",
                  value: "-10",
                  label: "-10 m/s",
                },
              ],
              correctAnswer: "d",
              selectedValue: "10",
              status: false,
            },
            "3": {
              text: "A force of 10 N is applied to an object, causing it to accelerate at a rate of 2 m/s². What is the mass of the object?",
              options: [
                {
                  id: "a",
                  value: "2",
                  label: "2 kg",
                },
                {
                  id: "b",
                  value: "5",
                  label: "5 kg",
                },
                {
                  id: "c",
                  value: "10",
                  label: "10 kg",
                },
                {
                  id: "d",
                  value: "20",
                  label: "20 kg",
                },
              ],
              correctAnswer: "b",
              selectedValue: "10",
              status: false,
            },
            "4": {
              text: "A wave has a frequency of 20 Hz and a wavelength of 10 m. What is its speed?",
              options: [
                {
                  id: "a",
                  value: "100",
                  label: "100 m/s",
                },
                {
                  id: "b",
                  value: "200",
                  label: "200 m/s",
                },
                {
                  id: "c",
                  value: "400",
                  label: "400 m/s",
                },
                {
                  id: "d",
                  value: "500",
                  label: "500 m/s",
                },
              ],
              correctAnswer: "b",
              selectedValue: "400",
              status: false,
            },
            "5": {
              text: "A block is placed on a horizontal surface and a force of 10 N is applied to it. If the coefficient of kinetic friction between the block and the surface is 0.2, what is the force of friction acting on the block?",
              options: [
                {
                  id: "a",
                  value: "2",
                  label: "2 N",
                },
                {
                  id: "b",
                  value: "5",
                  label: "5 N",
                },
                {
                  id: "c",
                  value: "10",
                  label: "10 N",
                },
                {
                  id: "d",
                  value: "20",
                  label: "20 N",
                },
              ],
              correctAnswer: "a",
              selectedValue: "10",
              status: false,
            },
            "6": {
              text: "A car travels a distance of 200 m in 10 seconds. What is its average speed?",
              options: [
                {
                  id: "a",
                  value: "10",
                  label: "10 m/s",
                },
                {
                  id: "b",
                  value: "20",
                  label: "20 m/s",
                },
                {
                  id: "c",
                  value: "30",
                  label: "30 m/s",
                },
                {
                  id: "d",
                  value: "40",
                  label: "40 m/s",
                },
              ],
              correctAnswer: "b",
              selectedValue: "20",
              status: false,
            },
            "8": {
              text: "A particle moves in a circular path with a radius of 2 m and a velocity of 4 m/s. What is its centripetal acceleration?",
              options: [
                {
                  id: "a",
                  value: "2",
                  label: "2 m/s²",
                },
                {
                  id: "b",
                  value: "4",
                  label: "4 m/s²",
                },
                {
                  id: "c",
                  value: "8",
                  label: "8 m/s²",
                },
                {
                  id: "d",
                  value: "16",
                  label: "16 m/s²",
                },
              ],
              correctAnswer: "c",
              selectedValue: "4",
              status: false,
            },
            "10": {
              text: "A block of mass 2 kg is placed on a horizontal surface. A force of 4 N is applied to the block, causing it to accelerate at a rate of 2 m/s². What is the coefficient of kinetic friction between the block and the surface?",
              options: [
                {
                  id: "a",
                  value: "0.1",
                  label: "0.1",
                },
                {
                  id: "b",
                  value: "0.2",
                  label: "0.2",
                },
                {
                  id: "c",
                  value: "0.3",
                  label: "0.3",
                },
                {
                  id: "d",
                  value: "0.4",
                  label: "0.4",
                },
              ],
              correctAnswer: "b",
              selectedValue: "0.1",
              status: false,
            },
            "12": {
              text: "A car travels a distance of 100 m in 5 seconds. What is its average speed?",
              options: [
                {
                  id: "a",
                  value: "10",
                  label: "10 m/s",
                },
                {
                  id: "b",
                  value: "20",
                  label: "20 m/s",
                },
                {
                  id: "c",
                  value: "30",
                  label: "30 m/s",
                },
                {
                  id: "d",
                  value: "40",
                  label: "40 m/s",
                },
              ],
              correctAnswer: "b",
              selectedValue: "20",
              status: false,
            },
            "13": {
              text: "A force of 20 N is applied to an object, causing it to accelerate at a rate of 4 m/s². What is the mass of the object?",
              options: [
                {
                  id: "a",
                  value: "2",
                  label: "2 kg",
                },
                {
                  id: "b",
                  value: "5",
                  label: "5 kg",
                },
                {
                  id: "c",
                  value: "10",
                  label: "10 kg",
                },
                {
                  id: "d",
                  value: "20",
                  label: "20 kg",
                },
              ],
              correctAnswer: "c",
              selectedValue: "5",
              status: false,
            },
            "14": {
              text: "A spring has a spring constant of 20 N/m. If a force of 40 N is applied to the spring, what is its extension?",
              options: [
                {
                  id: "a",
                  value: "1",
                  label: "1 m",
                },
                {
                  id: "b",
                  value: "2",
                  label: "2 m",
                },
                {
                  id: "c",
                  value: "3",
                  label: "3 m",
                },
                {
                  id: "d",
                  value: "4",
                  label: "4 m",
                },
              ],
              correctAnswer: "b",
              selectedValue: "1",
              status: false,
            },
            "16": {
              text: "A body is projected upwards with an initial velocity of 30 m/s. What is its velocity after 4 seconds, assuming the acceleration due to gravity is 10 m/s²?",
              options: [
                {
                  id: "a",
                  value: "-10",
                  label: "-10 m/s",
                },
                {
                  id: "b",
                  value: "-20",
                  label: "-20 m/s",
                },
                {
                  id: "c",
                  value: "-30",
                  label: "-30 m/s",
                },
                {
                  id: "d",
                  value: "-40",
                  label: "-40 m/s",
                },
              ],
              correctAnswer: "c",
              selectedValue: "-30",
              status: false,
            },
            "17": {
              text: "A block of mass 3 kg is placed on a horizontal surface. A force of 6 N is applied to the block, causing it to accelerate at a rate of 2 m/s². What is the coefficient of kinetic friction between the block and the surface?",
              options: [
                {
                  id: "a",
                  value: "0.1",
                  label: "0.1",
                },
                {
                  id: "b",
                  value: "0.2",
                  label: "0.2",
                },
                {
                  id: "c",
                  value: "0.3",
                  label: "0.3",
                },
                {
                  id: "d",
                  value: "0.4",
                  label: "0.4",
                },
              ],
              correctAnswer: "b",
              selectedValue: "0.3",
              status: false,
            },
          },
          mathematics: {
            "17": {
              text: "A block of mass 3 kg is placed on a horizontal surface. A force of 6 N is applied to the block, causing it to accelerate at a rate of 2 m/s². What is the coefficient of kinetic friction between the block and the surface?",
              options: [
                {
                  id: "a",
                  value: "0.1",
                  label: "0.1",
                },
                {
                  id: "b",
                  value: "0.2",
                  label: "0.2",
                },
                {
                  id: "c",
                  value: "0.3",
                  label: "0.3",
                },
                {
                  id: "d",
                  value: "0.4",
                  label: "0.4",
                },
              ],
              correctAnswer: "b",
              selectedValue: "0.2",
              status: false,
            },
            "18": {
              text: "A wave has a frequency of 100 Hz and a wavelength of 10 m. What is its speed?",
              options: [
                {
                  id: "a",
                  value: "500",
                  label: "500 m/s",
                },
                {
                  id: "b",
                  value: "1000",
                  label: "1000 m/s",
                },
                {
                  id: "c",
                  value: "1500",
                  label: "1500 m/s",
                },
                {
                  id: "d",
                  value: "2000",
                  label: "2000 m/s",
                },
              ],
              correctAnswer: "b",
              selectedValue: "1500",
              status: false,
            },
            "19": {
              text: "A car travels a distance of 50 m in 2 seconds. What is its average speed?",
              options: [
                {
                  id: "a",
                  value: "15",
                  label: "15 m/s",
                },
                {
                  id: "b",
                  value: "20",
                  label: "20 m/s",
                },
                {
                  id: "c",
                  value: "25",
                  label: "25 m/s",
                },
                {
                  id: "d",
                  value: "30",
                  label: "30 m/s",
                },
              ],
              correctAnswer: "c",
              selectedValue: "20",
              status: false,
            },
            "20": {
              text: "A force of 30 N is applied to an object, causing it to accelerate at a rate of 6 m/s². What is the mass of the object?",
              options: [
                {
                  id: "a",
                  value: "2",
                  label: "2 kg",
                },
                {
                  id: "b",
                  value: "5",
                  label: "5 kg",
                },
                {
                  id: "c",
                  value: "10",
                  label: "10 kg",
                },
                {
                  id: "d",
                  value: "15",
                  label: "15 kg",
                },
              ],
              correctAnswer: "c",
              selectedValue: "5",
              status: false,
            },
          },
          chemistry: {
            "20": {
              text: "A force of 30 N is applied to an object, causing it to accelerate at a rate of 6 m/s². What is the mass of the object?",
              options: [
                {
                  id: "a",
                  value: "2",
                  label: "2 kg",
                },
                {
                  id: "b",
                  value: "5",
                  label: "5 kg",
                },
                {
                  id: "c",
                  value: "10",
                  label: "10 kg",
                },
                {
                  id: "d",
                  value: "15",
                  label: "15 kg",
                },
              ],
              correctAnswer: "c",
              selectedValue: "5",
              status: false,
            },
            "21": {
              text: "A spring has a spring constant of 30 N/m. If a force of 60 N is applied to the spring, what is its extension?",
              options: [
                {
                  id: "a",
                  value: "1",
                  label: "1 m",
                },
                {
                  id: "b",
                  value: "2",
                  label: "2 m",
                },
                {
                  id: "c",
                  value: "3",
                  label: "3 m",
                },
                {
                  id: "d",
                  value: "4",
                  label: "4 m",
                },
              ],
              correctAnswer: "b",
              selectedValue: "3",
              status: false,
            },
            "22": {
              text: "A particle moves in a circular path with a radius of 4 m and a velocity of 8 m/s. What is its centripetal acceleration?",
              options: [
                {
                  id: "a",
                  value: "8",
                  label: "8 m/s²",
                },
                {
                  id: "b",
                  value: "16",
                  label: "16 m/s²",
                },
                {
                  id: "c",
                  value: "24",
                  label: "24 m/s²",
                },
                {
                  id: "d",
                  value: "32",
                  label: "32 m/s²",
                },
              ],
              correctAnswer: "c",
              selectedValue: "16",
              status: false,
            },
            "23": {
              text: "A body is projected upwards with an initial velocity of 40 m/s. What is its velocity after 5 seconds, assuming the acceleration due to gravity is 10 m/s²?",
              options: [
                {
                  id: "a",
                  value: "-20",
                  label: "-20 m/s",
                },
                {
                  id: "b",
                  value: "-30",
                  label: "-30 m/s",
                },
                {
                  id: "c",
                  value: "-40",
                  label: "-40 m/s",
                },
                {
                  id: "d",
                  value: "-50",
                  label: "-50 m/s",
                },
              ],
              correctAnswer: "c",
              selectedValue: "-40",
              status: false,
            },
            "24": {
              text: "A block of mass 4 kg is placed on a horizontal surface. A force of 8 N is applied to the block, causing it to accelerate at a rate of 2 m/s². What is the coefficient of kinetic friction between the block and the surface?",
              options: [
                {
                  id: "a",
                  value: "0.1",
                  label: "0.1",
                },
                {
                  id: "b",
                  value: "0.2",
                  label: "0.2",
                },
                {
                  id: "c",
                  value: "0.3",
                  label: "0.3",
                },
                {
                  id: "d",
                  value: "0.4",
                  label: "0.4",
                },
              ],
              correctAnswer: "b",
              selectedValue: "0.2",
              status: false,
            },
            "25": {
              text: "A wave has a frequency of 200 Hz and a wavelength of 20 m. What is its speed?",
              options: [
                {
                  id: "a",
                  value: "1000",
                  label: "1000 m/s",
                },
                {
                  id: "b",
                  value: "2000",
                  label: "2000 m/s",
                },
                {
                  id: "c",
                  value: "3000",
                  label: "3000 m/s",
                },
                {
                  id: "d",
                  value: "4000",
                  label: "4000 m/s",
                },
              ],
              correctAnswer: "c",
              selectedValue: "3000",
              status: false,
            },
          },
        },
      ],
      resultData: [
        {
          totalScore: -23,
          sectionScores: {
            physics: -13,
            mathematics: -4,
            chemistry: -6,
          },
          correctAnswers: 0,
          incorrectAnswers: 23,
          unanswered: 67,
        },
      ],
      timeSpent: "-10556",
      securityEvents: [
        {
          windowResizeAttempts: false,
          multipleFacesDetected: false,
          noiseDetected: false,
        },
      ],
      date: "2025-03-25T16:30:40.683Z",
      __v: 0,
    },
  }
  
  