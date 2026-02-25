import React from 'react';
import type { ScoreRule } from '../../types/risk.types';
import { EVENT_TYPE_LABELS } from '../../constants/eventTypes';

interface ScoreListProps {
  scores: ScoreRule[];
}

export const ScoreList: React.FC<ScoreListProps> = ({ scores }) => (
  <div className="score-list">
    <table className="list-table">
      <thead>
        <tr>
          <th>Evento</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score) => (
          <tr key={score.id}>
            <td>{score.name}</td>
            <td>{EVENT_TYPE_LABELS[score.eventType]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ScoreList;
