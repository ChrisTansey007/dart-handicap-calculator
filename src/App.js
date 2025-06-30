import React, {
  useReducer,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  Calculator,
  Users,
  Target,
  Trophy,
  Info,
  RotateCcw,
  Zap,
  Star,
  BookOpen,
  X,
  PlusCircle,
  Edit,
  Trash2,
} from "lucide-react";

// --- Configuration & Initial Data ---
const DART_CONSTANTS = {
  METHODS: {
    mpr: {
      name: "MPR-Based",
      inputs: ["mpr"],
      icon: Calculator,
      difficulty: "Beginner",
    },
    multiFactor: {
      name: "Multi-Factor",
      inputs: ["mpr", "closingSpeed", "accuracy", "pointsPerTurn"],
      icon: Target,
      difficulty: "Intermediate",
    },
    advanced: {
      name: "Advanced Dynamic",
      inputs: [
        "mpr",
        "closingSpeed",
        "accuracy",
        "pointsPerTurn",
        "consistency",
        "winRate",
      ],
      icon: Trophy,
      difficulty: "Expert",
    },
  },
};

const emptyPlayerData = {
  name: "",
  mpr: "",
  closingSpeed: { 20: "", 19: "", 18: "", 17: "", 16: "", 15: "", bull: "" },
  accuracy: { 20: "", 19: "", 18: "", 17: "", 16: "", 15: "", bull: "" },
  pointsPerTurn: "",
  consistency: "",
  winRate: "",
};

const initialRoster = [
  {
    id: "1",
    name: 'Alice "The Ace"',
    mpr: "3.5",
    closingSpeed: {
      20: "2.1",
      19: "2.5",
      18: "2.8",
      17: "3.1",
      16: "3.5",
      15: "4.0",
      bull: "5.0",
    },
    accuracy: {
      20: "85",
      19: "80",
      18: "75",
      17: "70",
      16: "65",
      15: "60",
      bull: "50",
    },
    pointsPerTurn: "15",
    consistency: "88",
    winRate: "75",
  },
  {
    id: "2",
    name: 'Bob "Bullseye"',
    mpr: "2.8",
    closingSpeed: {
      20: "2.9",
      19: "3.2",
      18: "3.5",
      17: "4.0",
      16: "4.5",
      15: "5.0",
      bull: "6.0",
    },
    accuracy: {
      20: "70",
      19: "65",
      18: "60",
      17: "55",
      16: "50",
      15: "45",
      bull: "35",
    },
    pointsPerTurn: "10",
    consistency: "75",
    winRate: "55",
  },
];

// --- Utility Functions ---
const getAvg = (obj) => {
  const values = Object.values(obj)
    .map((v) => parseFloat(v) || 0)
    .filter((v) => v > 0);
  return values.length > 0 ? values.reduce((a, b) => a + b) / values.length : 0;
};

const calculateSkillLevel = (player) => {
  if (!player) return 0;
  const mpr = parseFloat(player.mpr) || 0;
  const closingSpeed = getAvg(player.closingSpeed || {});
  const accuracy = getAvg(player.accuracy || {});
  const pointsPerTurn = parseFloat(player.pointsPerTurn) || 0;

  const skill =
    mpr * 0.4 +
    Math.max(0, 8 - closingSpeed) * 0.3 +
    accuracy * 0.2 +
    pointsPerTurn * 0.1;
  return skill;
};

// --- Reducer for State Management ---
const initialState = {
  roster: initialRoster,
  editingPlayer: null, // Holds the player object being edited, or `{}` for a new player
  selectedPlayer1Id: null,
  selectedPlayer2Id: null,
  selectedMethod: "mpr",
  handicapResult: null,
};

function handicapReducer(state, action) {
  switch (action.type) {
    case "START_EDIT_PLAYER":
      return {
        ...state,
        editingPlayer: action.payload || { ...emptyPlayerData, id: null },
      };
    case "CANCEL_EDIT":
      return { ...state, editingPlayer: null };
    case "SAVE_PLAYER": {
      const playerToSave = action.payload;
      if (playerToSave.id) {
        // Update existing player
        return {
          ...state,
          roster: state.roster.map((p) =>
            p.id === playerToSave.id ? playerToSave : p
          ),
          editingPlayer: null,
        };
      } else {
        // Add new player
        const newPlayer = { ...playerToSave, id: crypto.randomUUID() };
        return {
          ...state,
          roster: [...state.roster, newPlayer],
          editingPlayer: null,
        };
      }
    }
    case "DELETE_PLAYER":
      return {
        ...state,
        roster: state.roster.filter((p) => p.id !== action.payload),
      };
    case "SELECT_PLAYER_1":
      return {
        ...state,
        selectedPlayer1Id: action.payload,
        handicapResult: null,
      };
    case "SELECT_PLAYER_2":
      return {
        ...state,
        selectedPlayer2Id: action.payload,
        handicapResult: null,
      };
    case "SET_METHOD":
      return { ...state, selectedMethod: action.payload, handicapResult: null };
    case "CALCULATE_HANDICAP":
      return { ...state, handicapResult: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- Child Components ---

const PlayerFormModal = ({ player, onSave, onCancel }) => {
  const [playerData, setPlayerData] = useState(player);

  const handleUpdate = (field, value, subfield = null) => {
    setPlayerData((prev) => {
      if (subfield) {
        return { ...prev, [field]: { ...prev[field], [subfield]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const renderInput = (
    label,
    value,
    field,
    type = "number",
    placeholder = "0"
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => handleUpdate(field, e.target.value)}
        className="w-full px-4 py-2 bg-stone-900/80 border-2 border-amber-800/50 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        placeholder={placeholder}
      />
    </div>
  );
  const renderGridInputs = (label, field, data) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-300 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-4 gap-2">
        {["20", "19", "18", "17", "16", "15", "bull"].map((num) => (
          <div key={num} className="text-center">
            <label className="block text-xs text-stone-400 mb-1">{num}</label>
            <input
              type="number"
              step="0.1"
              value={data[num]}
              onChange={(e) => handleUpdate(field, e.target.value, num)}
              className="w-full p-1 text-sm bg-stone-900/80 border-2 border-amber-800/50 rounded-lg text-stone-200 text-center"
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-zinc-900 to-stone-900 border border-amber-800/40 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-stone-200">
            {player.id ? "Edit Player" : "Add New Player"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-stone-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {renderInput(
          "Player Name",
          playerData.name,
          "name",
          "text",
          "Enter name"
        )}
        {renderInput("MPR", playerData.mpr, "mpr", "number", "0.00")}
        {renderGridInputs(
          "Turns to Close",
          "closingSpeed",
          playerData.closingSpeed
        )}
        {renderGridInputs("Accuracy %", "accuracy", playerData.accuracy)}
        {renderInput(
          "Points Per Turn",
          playerData.pointsPerTurn,
          "pointsPerTurn",
          "number",
          "0.0"
        )}
        {renderInput(
          "Consistency %",
          playerData.consistency,
          "consistency",
          "number",
          "0"
        )}
        {renderInput(
          "Win Rate %",
          playerData.winRate,
          "winRate",
          "number",
          "50"
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-stone-700/50 text-stone-300 rounded-lg hover:bg-stone-700/80"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(playerData)}
            className="px-6 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700"
          >
            Save Player
          </button>
        </div>
      </div>
    </div>
  );
};

const PlayerRoster = ({ roster, dispatch }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-stone-200">Player Roster</h2>
      <button
        onClick={() => dispatch({ type: "START_EDIT_PLAYER" })}
        className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/40"
      >
        <PlusCircle size={20} /> Add Player
      </button>
    </div>
    <div className="space-y-4">
      {roster.length > 0 ? (
        roster.map((player) => (
          <div
            key={player.id}
            className="bg-stone-800/50 p-4 rounded-lg flex items-center justify-between border border-amber-900/50 hover:bg-stone-800/80 transition-colors"
          >
            <div>
              <p className="font-bold text-stone-200 text-lg">{player.name}</p>
              <p className="text-sm text-amber-400">
                Skill Level: {calculateSkillLevel(player).toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  dispatch({ type: "START_EDIT_PLAYER", payload: player })
                }
                className="p-2 text-stone-400 hover:text-white hover:bg-stone-700/50 rounded-md"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_PLAYER", payload: player.id })
                }
                className="p-2 text-red-500 hover:text-red-400 hover:bg-stone-700/50 rounded-md"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 bg-stone-900/30 rounded-lg border-2 border-dashed border-stone-700">
          <p className="text-stone-400">No players in your roster yet.</p>
          <p className="text-stone-500">Click "Add Player" to get started!</p>
        </div>
      )}
    </div>
  </div>
);

const Matchup = ({ roster, state, dispatch, onCalculate }) => {
  const { selectedPlayer1Id, selectedPlayer2Id, selectedMethod } = state;

  const renderPlayerSelect = (playerNum, selectedId, actionType) => {
    const otherPlayerId =
      playerNum === 1 ? selectedPlayer2Id : selectedPlayer1Id;
    return (
      <div className="flex-1 space-y-2">
        <label className="text-lg font-semibold text-stone-300">
          Player {playerNum}
        </label>
        <select
          value={selectedId || ""}
          onChange={(e) =>
            dispatch({ type: actionType, payload: e.target.value })
          }
          className="w-full p-3 bg-stone-900/80 border-2 border-amber-800/50 rounded-lg text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="" disabled>
            Select a player
          </option>
          {roster
            .filter((p) => p.id !== otherPlayerId)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-200 mb-6 text-center">
          Select Matchup & Method
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {renderPlayerSelect(1, selectedPlayer1Id, "SELECT_PLAYER_1")}
          <div className="flex items-center justify-center text-stone-500 text-2xl font-bold">
            VS
          </div>
          {renderPlayerSelect(2, selectedPlayer2Id, "SELECT_PLAYER_2")}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-stone-200 mb-4 text-center">
          Calculation Method
        </h3>
        <div className="flex justify-center gap-4">
          {Object.entries(DART_CONSTANTS.METHODS).map(([key, method]) => (
            <button
              key={key}
              onClick={() => dispatch({ type: "SET_METHOD", payload: key })}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${selectedMethod === key ? "bg-amber-600 text-white shadow-lg shadow-amber-900/40" : "bg-stone-800/60 text-stone-300 hover:bg-stone-800"}`}
            >
              {method.name}
            </button>
          ))}
        </div>
      </div>
      {selectedPlayer1Id && selectedPlayer2Id && (
        <div className="text-center pt-4">
          <button
            onClick={onCalculate}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50"
          >
            <Trophy className="inline h-5 w-5 mr-2" /> Calculate Handicap
          </button>
        </div>
      )}
    </div>
  );
};

const ResultsDisplay = ({ result }) => {
  if (!result) {
    return null;
  }
  if (result.type === "none") {
    return (
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 border-2 border-stone-700 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-stone-700/50 rounded-full p-3 mb-4 border border-stone-600">
            <Users className="h-8 w-8 text-stone-300" />
          </div>
          <h3 className="text-2xl font-bold text-stone-200 mb-2">
            Perfect Match! 🎯
          </h3>
          <p className="text-green-400 text-lg">{result.reason}</p>
        </div>
      </div>
    );
  }
  const { weakerPlayer, type, amount, numbers, explanation } = result;
  return (
    <div className="bg-gradient-to-br from-orange-900/70 via-stone-900 to-orange-900/70 border-2 border-amber-800/60 rounded-2xl p-8 shadow-2xl">
      <div className="flex flex-col items-center text-center">
        <div className="bg-stone-800/50 rounded-full p-4 mb-4 border-2 border-amber-700/50">
          <Target className="h-10 w-10 text-amber-400" />
        </div>
        <h3 className="text-2xl font-bold text-stone-200 mb-3">
          Recommended Handicap
        </h3>
        <div className="text-stone-300 mb-4 w-full">
          <p className="font-semibold text-xl mb-2">
            <span className="bg-black/30 px-3 py-1 rounded-lg">
              {weakerPlayer}
            </span>{" "}
            receives:
          </p>
          <div className="bg-stone-900/50 rounded-lg p-4 mb-4 border border-amber-900/50">
            {type === "points" && (
              <p className="text-4xl font-bold text-amber-400">
                {amount} point{amount !== 1 ? "s" : ""}
              </p>
            )}
            {type === "marks" && (
              <p className="text-3xl font-bold text-amber-400">
                {amount} mark{amount !== 1 ? "s" : ""} on {numbers.join(", ")}
              </p>
            )}
          </div>
        </div>
        <div className="bg-stone-900/50 rounded-lg p-4 border border-amber-900/50 w-full">
          <p className="text-sm font-semibold text-stone-200 mb-2">
            <Calculator className="inline h-4 w-4 mr-2" /> Details
          </p>
          <p className="text-sm text-stone-400">{explanation}</p>
        </div>
      </div>
    </div>
  );
};
const Guide = () => (
  <div className="bg-stone-900/50 border border-amber-900/50 p-8 rounded-2xl text-stone-300 space-y-6">
    <h2 className="text-3xl font-bold text-stone-200 text-center mb-4">
      How to Use This Calculator
    </h2>
    <div className="p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg">
      <h3 className="font-bold text-amber-400 flex items-center mb-2">
        <Info className="h-5 w-5 mr-2" /> The Goal
      </h3>
      <p className="text-amber-200/80">
        The purpose is to give the less-skilled player a starting advantage to
        make the game more competitive and enjoyable for both players.
      </p>
    </div>
    <div className="space-y-4">
      <h3 className="font-bold text-stone-200 text-lg">
        <span className="font-mono bg-stone-700/50 px-2 py-1 rounded-md mr-2">
          1
        </span>{" "}
        Manage Your Roster
      </h3>
      <p>
        Start on the "Roster" tab. Add players and their stats. You can edit or
        delete them at any time.
      </p>
    </div>
    <div className="space-y-4">
      <h3 className="font-bold text-stone-200 text-lg">
        <span className="font-mono bg-stone-700/50 px-2 py-1 rounded-md mr-2">
          2
        </span>{" "}
        Set Up a Matchup
      </h3>
      <p>
        Go to the "Matchup" tab. Select two players from your roster and choose
        a calculation method.
      </p>
    </div>
    <div className="space-y-4">
      <h3 className="font-bold text-stone-200 text-lg">
        <span className="font-mono bg-stone-700/50 px-2 py-1 rounded-md mr-2">
          3
        </span>{" "}
        Calculate & Apply
      </h3>
      <p>
        Click "Calculate Handicap" to see the results. Apply the recommended
        handicap at the start of your game and have fun!
      </p>
    </div>

    <div className="pt-6 border-t border-amber-900/50">
      <h2 className="text-2xl font-bold text-stone-200 mb-6 text-center">
        Formulas Explained
      </h2>
      <div className="space-y-6">
        <div className="bg-stone-800/50 p-4 rounded-lg border border-amber-900/50">
          <h4 className="font-bold text-amber-400 mb-2 flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            MPR-Based
          </h4>
          <p className="text-sm text-stone-400 mb-3">
            Simple method using only Marks Per Round. Perfect for quick
            calculations.
          </p>
          <div className="bg-stone-900/50 p-3 rounded border border-stone-700 text-xs">
            <p className="font-semibold text-stone-300 mb-1">Formula:</p>
            <p className="text-amber-300 font-mono">
              Handicap = |MPR₁ - MPR₂| × 3.5
            </p>
          </div>
        </div>

        <div className="bg-stone-800/50 p-4 rounded-lg border border-amber-900/50">
          <h4 className="font-bold text-stone-300 mb-2 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Multi-Factor
          </h4>
          <p className="text-sm text-stone-400 mb-3">
            Uses multiple metrics for a more precise handicap.
          </p>
          <div className="bg-stone-900/50 p-3 rounded border border-stone-700 text-xs">
            <p className="font-semibold text-stone-300 mb-1">
              Weighted Skill Formula:
            </p>
            <p className="text-amber-300 font-mono">
              Skill = f(MPR, Close Speed, Accuracy, PPT)
            </p>
            <p className="text-stone-400 mt-1">
              Handicap is based on |Skill₁ - Skill₂|
            </p>
          </div>
        </div>

        <div className="bg-stone-800/50 p-4 rounded-lg border border-amber-900/50">
          <h4 className="font-bold text-amber-400 mb-2 flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            Advanced Dynamic
          </h4>
          <p className="text-sm text-stone-400 mb-3">
            Includes consistency & win rate for adaptive results.
          </p>
          <div className="bg-stone-900/50 p-3 rounded border border-stone-700 text-xs">
            <p className="font-semibold text-stone-300 mb-1">
              Enhanced Formula:
            </p>
            <p className="text-amber-300 font-mono">
              Base = Multi-Factor Result
            </p>
            <p className="text-amber-300 font-mono">
              Adj = f(Consistency, WinRate)
            </p>
            <p className="text-stone-400 mt-1">Final = Base + Adjustment</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
// --- Main Application Component ---
const DartCricketHandicapCalculator = () => {
  const [state, dispatch] = useReducer(handicapReducer, initialState);
  const {
    roster,
    editingPlayer,
    selectedPlayer1Id,
    selectedPlayer2Id,
    selectedMethod,
    handicapResult,
  } = state;
  const [activeTab, setActiveTab] = useState("roster");

  const tabs = [
    { id: "roster", name: "Roster", icon: Users },
    { id: "matchup", name: "Matchup", icon: Calculator },
    { id: "results", name: "Results", icon: Target },
    { id: "guide", name: "Guide", icon: BookOpen },
  ];

  const calculateHandicapLogic = useCallback(() => {
    const p1 = roster.find((p) => p.id === selectedPlayer1Id);
    const p2 = roster.find((p) => p.id === selectedPlayer2Id);
    if (!p1 || !p2) return;

    const calculateMPR = (p1, p2) => {
      const mpr1 = parseFloat(p1.mpr) || 0;
      const mpr2 = parseFloat(p2.mpr) || 0;
      const diff = mpr1 - mpr2;
      if (Math.abs(diff) < 0.2)
        return {
          type: "none",
          reason: "Players are very evenly matched on MPR.",
        };
      const handicapPoints = Math.round(Math.abs(diff) * 3.5);
      return {
        type: "points",
        weakerPlayer: diff < 0 ? p1.name : p2.name,
        amount: Math.min(handicapPoints, 15),
        explanation: `${Math.abs(diff).toFixed(1)} MPR difference × 3.5 = ${handicapPoints} points.`,
      };
    };
    const calculateMultiFactor = (p1, p2) => {
      const skill1 = calculateSkillLevel(p1);
      const skill2 = calculateSkillLevel(p2);
      const skillDiff = skill1 - skill2;
      if (Math.abs(skillDiff) < 0.5)
        return {
          type: "none",
          reason: "Players are evenly matched across all metrics.",
        };
      const weakerPlayer = skillDiff < 0 ? p1.name : p2.name;
      if (Math.abs(skillDiff) < 1.5) {
        const points = Math.round(Math.abs(skillDiff) * 2.5);
        return {
          type: "points",
          weakerPlayer,
          amount: Math.min(points, 12),
          explanation: `Multi-factor skill difference: ${Math.abs(skillDiff).toFixed(1)} = ${points} points.`,
        };
      } else {
        const marksCount = Math.min(Math.round(Math.abs(skillDiff) * 0.8), 3);
        const numbers = ["20", "19", "18"].slice(0, marksCount);
        return {
          type: "marks",
          weakerPlayer,
          amount: 1,
          numbers,
          explanation: `High skill difference: ${Math.abs(skillDiff).toFixed(1)} = 1 mark head start.`,
        };
      }
    };
    const calculateAdvanced = (p1, p2) => {
      let result = calculateMultiFactor(p1, p2);
      const consistencyDiff = Math.abs(
        (parseFloat(p1.consistency) || 0) - (parseFloat(p2.consistency) || 0)
      );
      const winRateDiff = Math.abs(
        (parseFloat(p1.winRate) || 50) - (parseFloat(p2.winRate) || 50)
      );
      let adjustment = Math.round(consistencyDiff * 0.1 + winRateDiff * 0.05);
      if (
        result.type === "none" &&
        (consistencyDiff > 15 || winRateDiff > 20)
      ) {
        const weakerPlayer =
          (parseFloat(p1.winRate) || 50) < (parseFloat(p2.winRate) || 50)
            ? p1.name
            : p2.name;
        return {
          type: "points",
          weakerPlayer,
          amount: Math.min(adjustment, 6),
          explanation: `Adj: ${adjustment} points.`,
        };
      }
      if (result.type === "points") {
        result.amount = Math.min(result.amount + adjustment, 18);
        result.explanation += ` +${adjustment} from other factors.`;
      }
      return result;
    };

    let result;
    switch (selectedMethod) {
      case "mpr":
        result = calculateMPR(p1, p2);
        break;
      case "multiFactor":
        result = calculateMultiFactor(p1, p2);
        break;
      case "advanced":
        result = calculateAdvanced(p1, p2);
        break;
      default:
        result = { type: "none", reason: "No method selected" };
    }
    dispatch({ type: "CALCULATE_HANDICAP", payload: result });
    setActiveTab("results");
  }, [roster, selectedPlayer1Id, selectedPlayer2Id, selectedMethod]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "roster":
        return <PlayerRoster roster={roster} dispatch={dispatch} />;
      case "matchup":
        return (
          <Matchup
            roster={roster}
            state={state}
            dispatch={dispatch}
            onCalculate={calculateHandicapLogic}
          />
        );
      case "results":
        return handicapResult ? (
          <ResultsDisplay result={handicapResult} />
        ) : (
          <div className="text-center text-stone-500 py-10">
            Please select and calculate a matchup first.
          </div>
        );
      case "guide":
        return <Guide />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4 sm:p-6 lg:p-8 font-sans bg-gradient-to-br from-stone-900 via-zinc-900 to-black">
      {editingPlayer && (
        <PlayerFormModal
          player={editingPlayer}
          onSave={(p) => dispatch({ type: "SAVE_PLAYER", payload: p })}
          onCancel={() => dispatch({ type: "CANCEL_EDIT" })}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
            Dart Handicap Calculator
          </h1>
          <p className="mt-3 text-lg text-stone-400">
            Roster-based handicapping for fair and exciting matches.
          </p>
        </header>

        <div className="bg-stone-900/50 rounded-xl shadow-lg p-2 mb-8 border border-amber-900/40">
          <nav className="flex items-center justify-center space-x-1 md:space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-amber-600 text-white shadow-md shadow-amber-900/30" : "text-stone-400 hover:bg-stone-800/70"}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:inline">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <main className="bg-stone-900/50 p-6 md:p-10 rounded-2xl shadow-2xl border border-amber-900/40 min-h-[400px]">
          {renderTabContent()}
        </main>

        <footer className="text-center mt-8 text-stone-500 text-sm">
          <p>Designed for a fair and exciting game.</p>
        </footer>
      </div>
    </div>
  );
};

export default DartCricketHandicapCalculator;
