from datetime import datetime, timezone
from typing import List

from sqlmodel import SQLModel, Field, Relationship


class Workout(SQLModel, table=True):
    id: int = Field(primary_key=True)
    name: str = Field(max_length=250, nullable=False, default="Workout")
    user_id: int = Field(foreign_key="user.id")
    start_at: datetime = Field(nullable=True)
    end_at: datetime = Field(nullable=True)
    notes: str = Field(max_length=500, nullable=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Exercise(SQLModel, table=True):
    id: int = Field(primary_key=True)
    name: str = Field(max_length=50)
    exercise_muscle_groups: List["ExerciseMuscleGroup"] = Relationship(back_populates="exercise")

class MuscleGroup(SQLModel, table=True):
    id: int = Field(primary_key=True)
    name: str = Field(max_length=50)
    exercise_muscle_groups: List["ExerciseMuscleGroup"] = Relationship(back_populates="muscle_group")

class ExerciseMuscleGroup(SQLModel, table=True):
    id: int = Field(primary_key=True)
    exercise_id: int = Field(foreign_key="exercise.id")
    muscle_group_id: int = Field(foreign_key="musclegroup.id")
    exercise: Exercise = Relationship(back_populates="exercise_muscle_groups")
    muscle_group: MuscleGroup = Relationship(back_populates="exercise_muscle_groups")

class WorkoutExercise(SQLModel, table=True):
    id: int = Field(primary_key=True)
    workout_id: int = Field(foreign_key="workout.id")
    exercise_id: int = Field(foreign_key="exercise.id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Set(SQLModel, table=True):
    id: int = Field(primary_key=True)
    workout_exercise_id: int = Field(foreign_key="workoutexercise.id")
    reps: int
    weight: float
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CreateWorkout(SQLModel):
    start_at: datetime

class ExerciseResponse(SQLModel):
    id: int
    name: str
    muscle_groups: str

class CreateWorkoutExercise(SQLModel):
    workout_id: int
    exercise_id: int