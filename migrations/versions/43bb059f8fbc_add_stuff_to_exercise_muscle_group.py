"""add stuff to exercise muscle group

Revision ID: 43bb059f8fbc
Revises: d7a9382781b8
Create Date: 2024-12-03 21:15:36.316715

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '43bb059f8fbc'
down_revision: Union[str, None] = 'd7a9382781b8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
        INSERT INTO exercisemusclegroup (id, exercise_id, muscle_group_id) VALUES
        (1, 1, 1),
        (2, 2, 2),
        (3, 3, 3)
        """
    )


def downgrade() -> None:
    op.execute("DELETE FROM exercisemusclegroup WHERE id IN (1, 2, 3)")
