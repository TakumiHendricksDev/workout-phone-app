"""add some data

Revision ID: bcb8a8084a0c
Revises: bcba78731ada
Create Date: 2024-12-02 21:59:29.854166

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'bcb8a8084a0c'
down_revision: Union[str, None] = 'bcba78731ada'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add data to the Exercise table
    op.execute(
        """
        INSERT INTO exercise (id, name) VALUES
        (1, 'Push Up'),
        (2, 'Pull Up'),
        (3, 'Squat')
        """
    )

    # Add data to the MuscleGroup table
    op.execute(
        """
        INSERT INTO musclegroup (id, name) VALUES
        (1, 'Chest'),
        (2, 'Back'),
        (3, 'Legs')
        """
    )

    # Add data to the ExerciseMuscleGroup table
    op.execute(
        """
        INSERT INTO exercisemodelgroup (id, exercise_id, muscle_group_id) VALUES
        (1, 1, 1),
        (2, 2, 2),
        (3, 3, 3)
        """
    )

def downgrade() -> None:
    # Remove data from the ExerciseMuscleGroup table
    op.execute("DELETE FROM exercisemodelgroup WHERE id IN (1, 2, 3)")

    # Remove data from the MuscleGroup table
    op.execute("DELETE FROM musclegroup WHERE id IN (1, 2, 3)")

    # Remove data from the Exercise table
    op.execute("DELETE FROM exercise WHERE id IN (1, 2, 3)")
