from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import joinedload
from sqlmodel import select

from backend.accounts.models import User
from backend.dependencies import get_current_user, SessionDep
from backend.workouts.models import Workout, CreateWorkout, Exercise, ExerciseResponse, MuscleGroup, \
    ExerciseMuscleGroup, WorkoutExercise, CreateWorkoutExercise

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"],
    dependencies=[Depends(get_current_user)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[Workout])
async def get_workouts(
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    workouts = session.exec(select(Workout).where(Workout.user_id == current_user.id)).all()
    return workouts

@router.get("/{workout_id}/", response_model=Workout)
async def get_workout(
    workout_id: int,
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    workout = session.exec(select(Workout).where(Workout.user_id == current_user.id).where(Workout.id == workout_id)).first()
    return workout

@router.post("/", response_model=Workout)
async def create_workout(
    workout: CreateWorkout,
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    new_workout = Workout(
        user_id=current_user.id,
        start_at=workout.start_at,
    )
    session.add(new_workout)
    session.commit()
    session.refresh(new_workout)
    return new_workout

@router.get("/exercises/", response_model=List[ExerciseResponse])
async def get_exercises(
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    exercises = session.exec(select(Exercise)).all()

    exercise_responses = []
    for exercise in exercises:
        muscle_groups = session.exec(
            select(MuscleGroup.name)
            .join(ExerciseMuscleGroup, ExerciseMuscleGroup.muscle_group_id == MuscleGroup.id)
            .where(ExerciseMuscleGroup.exercise_id == exercise.id)
        ).all()
        muscle_groups_str = ", ".join([mg for mg in muscle_groups])
        exercise_responses.append(
            ExerciseResponse(
                id=exercise.id,
                name=exercise.name,
                muscle_groups=muscle_groups_str,
            )
        )

    return exercise_responses

@router.get("/exercise/{exercise_id}/", response_model=ExerciseResponse)
async def get_exercise(
    exercise_id: int,
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    exercise = session.exec(select(Exercise).where(Exercise.id == exercise_id)).first()

    muscle_groups = session.exec(
        select(MuscleGroup.name)
        .join(ExerciseMuscleGroup, ExerciseMuscleGroup.muscle_group_id == MuscleGroup.id)
        .where(ExerciseMuscleGroup.exercise_id == exercise.id)
    ).all()
    muscle_groups_str = ", ".join([mg for mg in muscle_groups])

    return ExerciseResponse(
        id=exercise.id,
        name=exercise.name,
        muscle_groups=muscle_groups_str,
    )

@router.get("/{workout_id}/exercises/", response_model=List[WorkoutExercise])
async def get_workout_exercises(
    session: SessionDep,
    workout_id: int,
    current_user: User = Depends(get_current_user)
):
    workout_exercises = session.exec(
        select(WorkoutExercise)
        .where(WorkoutExercise.workout_id == workout_id)
    ).all()
    return workout_exercises

@router.get("/workout_exercise/{workout_exercise_id}/", response_model=WorkoutExercise)
async def get_workout_exercise(
    workout_id: int,
    workout_exercise_id: int,
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    workout_exercise = session.exec(
        select(WorkoutExercise)
        .where(WorkoutExercise.workout_id == workout_id)
        .where(WorkoutExercise.id == workout_exercise_id)
    ).first()
    return workout_exercise

@router.post("/workout_exercise/", response_model=WorkoutExercise)
async def add_exercise_to_workout(
    data: CreateWorkoutExercise,
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    new_workout_exercise = WorkoutExercise(
        workout_id=data.workout_id,
        exercise_id=data.exercise_id,
    )
    session.add(new_workout_exercise)
    session.commit()
    session.refresh(new_workout_exercise)
    return new_workout_exercise