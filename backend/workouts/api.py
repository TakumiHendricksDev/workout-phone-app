from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import joinedload
from sqlmodel import select

from backend.accounts.models import User
from backend.dependencies import get_current_user, SessionDep
from backend.workouts.models import Workout, CreateWorkout, Exercise, ExerciseResponse, MuscleGroup, ExerciseModelGroup

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

@router.get("/{workout_id}", response_model=Workout)
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
            .join(ExerciseModelGroup, ExerciseModelGroup.muscle_group_id == MuscleGroup.id)
            .where(ExerciseModelGroup.exercise_id == exercise.id)
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