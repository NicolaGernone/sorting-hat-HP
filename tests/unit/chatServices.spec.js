import { describe, it, expect, vi, beforeEach } from 'vitest';
import chatService from '@/services/chatService';

describe('chatService', () => {
  let serviceInstance;

  beforeEach(() => {
    // Crear una nueva instancia de los métodos
    serviceInstance = {
      ...chatService.methods,
      ...chatService.data(),
    };

    // Mock de scrollToBottom para evitar llamadas innecesarias durante las pruebas
    serviceInstance.scrollToBottom = vi.fn();
  });

  it('should initialize with empty chatHistory, questions and houseResult', () => {
    expect(serviceInstance.chatHistory).toEqual([]);
    expect(serviceInstance.questions).toEqual([]);
    expect(serviceInstance.houseResult).toBeNull();
  });

  it('should update scores based on selectedAnswer', () => {
    const selectedOption = {
      title: 'Courage',
      scores: { g: 100, h: 50 },
    };
    serviceInstance.selectAnswer(selectedOption);

    expect(serviceInstance.scores.Gryffindor).toBe(100);
    expect(serviceInstance.scores.Hufflepuff).toBe(50);
  });

  it('should add selected answer to chatHistory', () => {
    const selectedOption = {
      title: 'Wisdom',
      scores: { r: 100 },
    };
    serviceInstance.chatHistory.push({ text: 'What would you choose?', isOptions: true });

    serviceInstance.selectAnswer(selectedOption);

    // Verificar que la opción seleccionada se haya agregado al historial de chat
    expect(serviceInstance.chatHistory).toEqual([
      { text: 'What would you choose?', isOptions: true },
      { text: 'Wisdom', user: true },
    ]);
  });

  it('should load next question when selectAnswer is called', () => {
    serviceInstance.questions = [
      {
        title: 'First Question',
        answers: [{ title: 'Answer 1', scores: { g: 50 } }],
      },
      {
        title: 'Second Question',
        answers: [{ title: 'Answer 2', scores: { h: 50 } }],
      },
    ];
    serviceInstance.chatHistory.push({ text: 'First Question', isOptions: true });

    serviceInstance.selectAnswer({ title: 'Answer 1', scores: { g: 50 } });

    // Verificar que la segunda pregunta se haya agregado al historial de chat
    expect(serviceInstance.chatHistory).toEqual([
      { text: 'First Question', isOptions: true },
      { text: 'Answer 1', user: true },
      { text: 'Second Question', user: false, isOptions: true, options: serviceInstance.questions[1].answers },
    ]);
  });

  it('should show final result when all questions are answered', () => {
    serviceInstance.questions = [
      {
        title: 'First Question',
        answers: [{ title: 'Answer 1', scores: { g: 50 } }],
      },
    ];
    serviceInstance.selectAnswer({ title: 'Answer 1', scores: { g: 50 } });

    // Verificar que se muestre el resultado final
    expect(serviceInstance.houseResult).toBe('You belong to Gryffindor');
  });

  it('should reset chat correctly', () => {
    serviceInstance.chatHistory.push({ text: 'Test message' });
    serviceInstance.scores.Gryffindor = 100;
    serviceInstance.houseResult = 'Gryffindor';

    serviceInstance.resetChat();

    // Verificar que todo ha sido reiniciado correctamente
    expect(serviceInstance.chatHistory).toEqual([]);
    expect(serviceInstance.scores).toEqual({
      Gryffindor: 0,
      Hufflepuff: 0,
      Ravenclaw: 0,
      Slytherin: 0,
    });
    expect(serviceInstance.houseResult).toBeNull();
  });

  it('should trigger confetti when final result is shown', () => {
    const confettiMock = vi.fn();
    window.confetti = confettiMock;

    serviceInstance.showFinalResult();

    expect(confettiMock).toHaveBeenCalled();
  });
});
