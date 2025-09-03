import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AIButton from '../components/AIButton';
import Button from '../components/Button';
import Input from '../components/Input';
import { usePaymentContext } from '../hooks/usePayment';
import { generateBusinessIdea, findCollaborators } from '../services/openai';
import { Brain, Lightbulb, Users, Sparkles, Lock } from 'lucide-react';

const AIAssistant = () => {
  const { user, saveAiIdea, aiIdeas } = useApp();
  const { createSession } = usePaymentContext();
  const [isPaid, setIsPaid] = useState(false);
  const [ideaInput, setIdeaInput] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      await createSession();
      setIsPaid(true);
    } catch (error) {
      console.error('Payment failed:', error);
      // For demo purposes, allow access without payment
      setIsPaid(true);
    }
  };

  const handleGenerateIdea = async () => {
    if (!ideaInput.trim()) return;
    
    setIsLoading(true);
    try {
      const idea = await generateBusinessIdea(ideaInput, user.interests);
      setGeneratedIdea(idea);
    } catch (error) {
      console.error('Failed to generate idea:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindCollaborators = async () => {
    if (!generatedIdea) return;
    
    setIsLoading(true);
    try {
      const suggestedCollaborators = await findCollaborators(
        generatedIdea.description,
        ['Technical', 'Marketing', 'Design']
      );
      setCollaborators(suggestedCollaborators);
    } catch (error) {
      console.error('Failed to find collaborators:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveIdea = () => {
    if (generatedIdea) {
      saveAiIdea({
        description: generatedIdea.description,
        validationStatus: 'Generated'
      });
    }
  };

  if (!isPaid) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center bg-surface border border-border rounded-lg p-8">
          <Lock className="mx-auto mb-4 text-primary" size={48} />
          <h2 className="text-2xl font-bold text-text mb-4">Premium AI Assistant</h2>
          <p className="text-textMuted mb-6">
            Access advanced AI features for idea generation and collaboration matching.
            Unlock your startup potential with AI-powered insights.
          </p>
          <div className="bg-background border border-border rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-text mb-2">What you get:</h3>
            <ul className="text-left text-textMuted space-y-1">
              <li>• AI-powered business idea generation</li>
              <li>• Personalized collaboration recommendations</li>
              <li>• Idea validation and refinement tools</li>
              <li>• Market analysis and competitive insights</li>
            </ul>
          </div>
          <Button
            variant="primary"
            onClick={handlePayment}
            className="px-8 py-3"
          >
            Unlock AI Assistant - $0.001
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-4">AI Startup Assistant</h1>
        <p className="text-textMuted">
          Leverage AI to generate innovative startup ideas, validate concepts, and find the perfect collaborators
        </p>
      </div>

      {/* Idea Generation Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="text-primary" size={24} />
            <h2 className="text-xl font-semibold text-text">Generate Ideas</h2>
          </div>
          
          <div className="space-y-4">
            <Input
              label="Describe your vision or problem area"
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              placeholder="e.g., AI-powered study tools for students"
              className="mb-4"
            />
            
            <AIButton
              variant="generateIdea"
              onClick={handleGenerateIdea}
              disabled={!ideaInput.trim() || isLoading}
              className="w-full"
            />
          </div>

          {/* User Interests */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-textMuted mb-2">Your Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Idea Display */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="text-accent" size={24} />
            <h2 className="text-xl font-semibold text-text">Generated Idea</h2>
          </div>

          {generatedIdea ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text mb-2">{generatedIdea.title}</h3>
                <p className="text-textMuted text-sm">{generatedIdea.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-text mb-1">Target Market</h4>
                <p className="text-textMuted text-sm">{generatedIdea.targetMarket}</p>
              </div>

              <div>
                <h4 className="font-medium text-text mb-2">Key Features</h4>
                <ul className="text-textMuted text-sm space-y-1">
                  {generatedIdea.features?.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={handleSaveIdea}
                  size="sm"
                >
                  Save Idea
                </Button>
                <AIButton
                  variant="findCollaborator"
                  onClick={handleFindCollaborators}
                  disabled={isLoading}
                  className="text-sm px-3 py-1"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="mx-auto mb-3 text-textMuted" size={32} />
              <p className="text-textMuted">Your AI-generated idea will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Collaborators Section */}
      {collaborators.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="text-orange-500" size={24} />
              <h2 className="text-xl font-semibold text-text">Suggested Collaborators</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collaborators.map((collaborator, index) => (
                <div key={index} className="bg-background border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-text mb-2">{collaborator.role}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-textMuted">Skills: </span>
                      <span className="text-text">{collaborator.skills?.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-textMuted">Responsibilities: </span>
                      <span className="text-text">{collaborator.responsibilities}</span>
                    </div>
                    <div>
                      <span className="text-textMuted">Why important: </span>
                      <span className="text-text">{collaborator.importance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Saved Ideas */}
      {aiIdeas.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-text mb-4">Your Saved Ideas</h2>
            <div className="space-y-3">
              {aiIdeas.map((idea) => (
                <div key={idea.ideaId} className="bg-background border border-border rounded-lg p-4">
                  <p className="text-text">{idea.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-textMuted">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                      {idea.validationStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;