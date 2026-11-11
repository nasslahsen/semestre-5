/* TD 2, « The Skills of the Future », Comprehension, Exercise 1, questions 1 à 5 : réponses de l'answer key du document. */
var P1 = "The world of work is changing at an unprecedented pace. Advances in artificial intelligence, automation, biotechnology, and digital communication are transforming the way people live and work. Some traditional jobs are disappearing, while new professions are emerging.";
NIVEAU(ANG.niveau({
  id: "td2",
  carte: { etiquette: "The Skills of the Future, paragraph 1", titre: "A changing world of work", texte: P1 },
  etapes: [
    { nom: "Question 1", type: "choix",
      titre: "1. Why is the world of work changing rapidly?",
      options: [
        { t: "Because of advances in artificial intelligence, automation, biotechnology, and digital communication.", ok: true },
        { t: "Because traditional jobs are becoming more popular.", aide: "The text says traditional jobs are disappearing." },
        { t: "Because people refuse to adapt.", aide: "The text talks about technological causes." }],
      bravo: "Answer key: because of advances in AI, automation, biotechnology, and digital communication.",
      expliquer: "<p>To answer “Why…?”, start with <b>Because</b> and reuse the words of the text.</p>" },
    { nom: "Question 2", type: "choix",
      titre: "2. Why will critical thinking become increasingly important?",
      carte: { etiquette: "Paragraph 2", titre: "Critical thinking", texte: "In an age when enormous amounts of information are available at the click of a button, people must be able to distinguish reliable information from misleading or false claims. Critical thinkers question assumptions, examine evidence, identify contradictions, and reach conclusions based on logical reasoning." },
      options: [
        { t: "Because people have access to enormous amounts of information and need to distinguish reliable information from misleading or false claims.", ok: true },
        { t: "Because technology always gives accurate information.", aide: "The text says the opposite: technology cannot always judge whether information is accurate." },
        { t: "Because people read fewer books.", aide: "The text doesn't mention books." }],
      bravo: "Too much information: you must separate the reliable from the misleading.",
      expliquer: "<p><b>Reliable</b> (you can trust it) is the opposite of <b>misleading</b> (it deceives you).</p>" },
    { nom: "Question 3", type: "choix",
      titre: "3. What does the text suggest about the relationship between creativity and technology?",
      carte: { etiquette: "Paragraph 3", titre: "Creativity", texte: "Although machines can perform many repetitive tasks efficiently, human beings remain capable of imagining original ideas and approaching problems from unexpected perspectives. Creativity is not limited to artistic activities." },
      options: [
        { t: "Technology can perform many repetitive tasks, but humans are still capable of imagining original ideas and finding unexpected solutions.", ok: true },
        { t: "Technology has completely replaced human creativity.", aide: "“Human beings remain capable of imagining original ideas”." },
        { t: "Creativity is only useful for artists, not with technology.", aide: "“Creativity is not limited to artistic activities”." }],
      bravo: "Machines do repetitive work; humans keep imagination.",
      expliquer: "<p><b>Although</b> introduces the contrast between machines and humans.</p>" },
    { nom: "Question 4", type: "choix",
      titre: "4. Why are communication and collaboration important in modern workplaces?",
      carte: { etiquette: "Paragraph 4", titre: "Communication and collaboration", texte: "Modern workplaces often bring together people from different cultures, professions, and geographical locations. Employees must therefore be able to express their ideas clearly, listen actively, negotiate disagreements, and work effectively as members of a team." },
      options: [
        { t: "Because workplaces bring together people from different cultures, professions, and locations who need to work effectively together.", ok: true },
        { t: "Because employees work alone most of the time.", aide: "The text talks about teams, not working alone." },
        { t: "Because face-to-face meetings are forbidden.", aide: "Nothing like that in the text." }],
      bravo: "Very different people have to work together.",
      expliquer: "<p><b>Therefore</b> links the cause (diverse teams) to the consequence (communicating well).</p>" },
    { nom: "Question 5", type: "choix",
      titre: "5. What problems can arise from digital communication?",
      carte: { etiquette: "Paragraph 4", titre: "Communication and collaboration", texte: "Digital communication has made collaboration easier in many ways, but it has also created new challenges. Misunderstandings can arise when people communicate through emails, messages, or video conferences rather than face to face." },
      options: [
        { t: "Misunderstandings, because people communicate through emails, messages and video conferences rather than face to face.", ok: true },
        { t: "It is impossible to communicate with other countries.", aide: "On the contrary, digital tools make remote collaboration easier." },
        { t: "Teamwork disappears completely.", aide: "The text talks about misunderstandings, not disappearance." }],
      bravo: "Answer key: misunderstandings.",
      expliquer: "<p><b>To arise</b>: to appear, to happen. <b>Rather than</b>: instead of.</p>" }
  ]
}));
